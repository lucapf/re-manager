import {toast} from 'sonner' 
export function getPFTowersByCommunity(community, setPfTowers,linked){
  const strUrl=`/api/ads/towers?community=${community}&linked=${linked}`
  const towersRequest= new Request(strUrl, { method: "GET" });
  fetch(towersRequest)
  .then((response)=>{
    console.log(response.status)
    if (response.status === 200){
      console.log('data retrieved')
      response.json().then((data) => {setPfTowers(data.towers)})
    }else{
      console.log(`error during fetch ${response.status} pls check logs`)
    } })
}

export function getLinkedTowersByCommunity(community, setLinkedTowers){
  const towersRequest= new Request(`/api/link?community=${community}`,
                                   { method: "GET" });
  fetch(towersRequest)
  .then((response)=>{
    console.log(response.status)
    if (response.status === 200){
      console.log('data retrieved')
      response.json().then((data) => {setLinkedTowers(data)})
    }else{
      console.log(`error during fetch ${response.status} pls check logs`)
    } })
}

export function getPulseTowersByCommunity(community, setPulseTowers, isLinked){
  const url = `/api/pulse/towers?community=${community}&linked=${isLinked}`
  const towersRequest= new Request(url, { method: "GET" });
  fetch(towersRequest)
  .then((response)=>{
    console.log(response.status)
    if (response.status === 200){
      console.log('data retrieved')
      response.json().then((data) => {setPulseTowers(data)})
    }else{
      console.log(`error during fetch ${response.status} pls check logs`)
    } })
}

export function removeLink(linkedTower){
  console.log(`remove link ${linkedTower.pulse_building}`)
  const strUrl=`/api/link?community=${encodeURIComponent(linkedTower.community)}` +
               `&ad_tower=${encodeURIComponent(linkedTower.ad_tower)}` +
               `&pulse_building=${encodeURIComponent(linkedTower.pulse_building)}`
  console.log(`url: ${strUrl}`)
  const towersRequest= new Request(strUrl, { method: "DELETE" });
  fetch(towersRequest)
  .then((response)=>{
    console.log(response.status)
    if (response.status === 200){
      console.log('deleted')
    }else{
      console.log(`error during fetch ${response.status} pls check logs`)
    } })
}

// post object
//{ community: string, propertyfinder_tower: string, pulse_master_project: string, pulse_building_name: string }
export function linkTowerToBuilding(linkData, setLinkedTowers, setPfTowers, setPulseTowers){
  console.log(`link tower to building ${JSON.stringify(linkData)}`)
  const strUrl=`/api/link`
  let isLinked = false
  const towersRequest= new Request(strUrl, { method: "POST", body: JSON.stringify(linkData)});
  fetch(towersRequest)
  .then((response)=>{
    console.log(response.status)
    if (response.status === 201){
      getLinkedTowersByCommunity(linkData.community,setLinkedTowers)
      //setPulseTowers("")
      //setPfTowers("")
      toast.success("linked")
      isLinked = true 
    }else if (response.status ==403){
      response.text()
        .then((message) => {
          toast.error(message)
        })
    } })
  return isLinked
}
