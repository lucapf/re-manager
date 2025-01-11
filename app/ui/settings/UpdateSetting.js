
export async function update_setting(current_key, type, value){
  const update_ad= new Request("/api/settings", {
      method: "PATCH",
      body: JSON.stringify({'key': current_key, 'type': type, 'value': value})
    });
    const response = await fetch(update_ad);
  return response.status 
          
  }
