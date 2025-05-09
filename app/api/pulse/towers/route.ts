import {getPulseTowersByCommunity} from '@/app/data'
import {MAX_COMMUNITY_LENGTH, checkMandatoryValueString }  from '@/app/api/values'



export async function GET(request: Request) {
  const url =  new URL(request.url)
  const community = url.searchParams.get('community')
  const linked = url.searchParams.get('linked')
   if (linked == null || (linked != 'false' && linked !='true')){
     const message='linked is mandatory boolean'
     return new Response(new Blob([message]), {status: 403, statusText: message})
   }
   const response = checkMandatoryValueString(community, MAX_COMMUNITY_LENGTH, 'community')
   if( response.status != 200) {
     return new Response(new Blob([response.message]), {status: response.status, statusText: response.statusText})
   }
   try{ 
    return Response.json(await getPulseTowersByCommunity(community!, (linked== 'true')))
  }catch (exception){
    console.log(exception)
    return new Response(new Blob(['error fetching data']), {status: 500})
  }
}



