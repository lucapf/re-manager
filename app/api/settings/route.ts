import {saveConfigValue} from '@/app/data'

export async function PATCH(request:Request){
  const data = await request.json()
  const current_key = data.key
  const type = data.type
  const value = data.value
  console.log(`current key ${current_key}`)
  if (current_key == null || type== null || value == null){
   return new Response(new Blob(), {status: 406, statusText: "key, type and value are mandatory"}) 
  }
  if (current_key.length > 50 || value.length > 50){
   return new Response(new Blob(), {status: 406, statusText: "key or value too long "}) 
  }
  
  if (!(type == 'text' || type == 'number') ){
   return new Response(new Blob(), {status: 406, statusText: "type should be text or number"}) 
  }
  const newValue = await saveConfigValue(current_key, type, value)
  console.log(`new value ${newValue}`)
  return Response.json({'favorite': newValue})
  
}
