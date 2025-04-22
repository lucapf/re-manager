import { getPropertyLables } from "@/app/data";

export async function GET(request:Request){
  const url = new URL(request.url)
  const ad_id = url.searchParams.get('ad_id')
  if (ad_id == null){
    return new Response(new Blob(["ad_id is mandatory"]), {status: 403})
  }
  console.log(`param ad_id ${ad_id}`)
  const labels = await getPropertyLables(ad_id!)
  if (labels == null){
    return Response.json([])
  }else{
    return Response.json(labels)
  }
  
}
