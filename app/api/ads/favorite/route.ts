import {update_favorite} from '@/app/data'

export async function PATCH (request:Request){
  const data = await request.json()
  const newValue = await update_favorite(data.id)
  console.log(`new value ${newValue}`)
  return Response.json({'favorite': newValue})
  
}
