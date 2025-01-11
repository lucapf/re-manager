import {toast} from 'sonner'

export async function delete_ad(ad_id ){
  const deleteRequest = new Request("/api/ads", {
      method: "DELETE",
      body: JSON.stringify({id: ad_id})
    });
    const response = await fetch(deleteRequest);
    if (response.status === 200){
      var elementid = `Summary_${ad_id}`
      document.getElementById(elementid).style.display = "none"
      
    }
      console.log(`response: ${response.status}`);
    if (response.status === 200){
      toast.success('success')
    }else{
      toast.error('update failed, pls check')
    }
  }

export async function set_as_favorite(ad_id ){
  const update_ad= new Request("/api/ads/favorite", {
      method: "PATCH",
      body: JSON.stringify({id: ad_id})
    });
    const response = await fetch(update_ad);
    if (response.status === 200){
      toast.success('success')
    }else{
      toast.error('update failed, pls check')
    }
  return await response.json()
          
  }
