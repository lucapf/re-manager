import {towersByCommunity}  from '@/app/data'

function checkCommunity(community:string){
  if(community ==null) {
    return new Response(new Blob(['community is mandatory']), 
                        {status: 403, statusText:"community is mandatory"})
  }
  if (community.length > 50){
    return new Response(new Blob(['community value too long']), 
                        {status: 403, statusText:"community value too long "})
  }
  return null
}

function checkIsLinked(isLinked?: boolean){
  if (isLinked == null) {
    return new Response(new Blob(['liked (boolean) is mandatory accepted vavalue too long']), 
                        {status: 403, statusText:"community value too long "})
  }
}
export async function GET(request:Request){
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  let isLinked = url.searchParams.get('linked')
  if (isLinked == null || (isLinked != 'false' && isLinked !='true')){
    const message=`linked is mandatory boolean`
    return new Response(new Blob([message], {status: 403, statusText:message}))
  }

  if (checkCommunity(community) != null){
    return checkCommunity(community)
  }
  console.log(`get towers for community: ${community} linked ${isLinked}`)
  try{ 
    const response = await towersByCommunity(community, isLinked)
    return Response.json({'towers': response})
  }catch{
    return new Response(new Blob(['error fetching data']), {status: 500})
  }

}
