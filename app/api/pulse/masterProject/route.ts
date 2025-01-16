import {decodeCommunity} from '@/app/data'
export async function GET(request: Request) {
  const url =  new URL(request.url)
  let community = url.searchParams.get('community')
  if (community ==null) {
    return new Response(new Blob(['community is mandatory']), {status: 403, statusText:"community is mandatory"})
  }
  if (community.length > 50){
    return new Response(new Blob(['community value too long']), {status: 403, statusText:"community value too long "})
  }
  try{ 
    return new Response(new Blob([await decodeCommunity(community)]),{status:200})
  }catch{
    return new Response(new Blob(['error fetching data']), {status: 500})
  }
}
