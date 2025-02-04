import {towersByCommunity}  from '@/app/data'

function checkCommunity(community?: string| 'undefined'| null){
  if(community == null) {
    return {message: 'community is mandatory', status: 403, statusText:"community is mandatory"}
  }
  if (community.length > 50){
    return {message:'community value too long', status: 403, statusText:"community value too long "}
  }
  return null
}



export async function GET(request:Request): Promise<Response>{
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  const isLinked = url.searchParams.get('linked') 
  if (isLinked == null || (isLinked != 'false' && isLinked != 'true')){
    const message=`linked is mandatory boolean`
    return new Response(new Blob([message]), {status: 403, statusText:message})
  }
  const communityValid  = checkCommunity(community)
  if ( communityValid!= null){
    return new Response(new Blob([communityValid.message]), {status: communityValid.status, statusText:communityValid.statusText})
  }
  console.log(`get towers for community: ${community} linked ${isLinked}`)
  try{ 
    const response = await towersByCommunity(community, (isLinked == 'true') )
    return Response.json(response)
  }catch{
    return new Response(new Blob(['error fetching data']), {status: 500})
  }

}
