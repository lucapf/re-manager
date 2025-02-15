import {toast} from 'sonner'

export async function delete_ad(ad_id ){
  const deleteRequest = new Request("/manager/api/ads", {
      method: "DELETE",
      body: JSON.stringify({id: ad_id})
    });
    const response = await fetch(deleteRequest);
    if (response.status === 200){
      var elementid = `Summary_${ad_id}`
      document.getElementById(elementid).style.display = "none"
    }
    if (response.status === 200){
      toast.success('success')
    }else{
      toast.error('update failed, pls check')
    }
  }

export async function set_as_favorite(ad_id ){
  const update_ad= new Request("/manager/api/ads/favorite", {
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

export async function get_labels(ad_id, setLables, base_url){
  const url = new URL(`/manager/api/ads/labels?ad_id=${ad_id}`, base_url)
  const labels_request= new Request(url, {method: "GET"});
  function innerSetLabels(lbl){
      if(lbl != ""){setLables(lbl)}
  }
  fetch(labels_request).then((response) =>{
      if (response.status === 200){
        response.json()
        .then((lbl) => {innerSetLabels(lbl) })
      }else{
     toast.error("error fetching labels, pls check the logs")
    }
  })
}
