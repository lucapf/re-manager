import { redirect } from 'next/navigation'
import {discard_ad} from '@/app/data'
 
export async function DELETE(request: Request) {
  let data = await request.json()
  await discard_ad(data.id)
  return new Response(`discarded ad with id ${data.id}`, {status: 200 }) 
}
