import {linkedByCommunity, unlink, link}  from '@/app/data'
import {checkMandatoryValueString, MAX_COMMUNITY_LENGTH} from '@/app/api/values'
function isNotNullAndLenghtLessThan(value,name , maxLength){
if(value ==null) {
    return new Response(new Blob(['${name} is mandatory']), 
                        {status: 403, statusText:`${name} is mandatory`})
  }
  if (value.length > maxLength){
    return new Response(new Blob(['${name} too long']), 
                        {status: 403, statusText:`${name} value too long `})
  }
  return null

}

export async function GET(request:Request){
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  const linked= url.searchParams.get('linked')
  const communityIsValid= isNotNullAndLenghtLessThan(community, 'community',50);
  if (! communityIsValid == null){
    return communityIsValid 
  }
  try{ 
    const response = await linkedByCommunity(community )
    return Response.json(response)
  }catch(exception ){
    console.log(exception)
    return new Response(new Blob(['error fetching data']), {status: 500})
  }
}

export async function DELETE(request:Request){
  console.log("delete link")
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  const adTower= url.searchParams.get('ad_tower')
  const pulseBuilding= url.searchParams.get('pulse_building')
  if (! isNotNullAndLenghtLessThan(community, 'community',50) == null && 
      ! isNotNullAndLenghtLessThan(adTower, 'propertyfinder tower',50) == null && 
      ! isNotNullAndLenghtLessThan(community, 'pulse building',50) == null){
    console.log("check failed!!")
    return check  
  }
  try{ 
    console.log('unlinked')
    const response = await unlink(community, adTower, pulseBuilding)
    return new Response(new Blob(), {status:200, statusText: "unlinked"})
  }catch(exception ){
    console.log(exception)
    const blob = new Blob([`error removing link for community: ${community} ${adTower} ${pulseBuilding}`])
    return new Response(blob , {status: 500})
  }

}

export async function POST(request: Request) {
  const towerDataToLink = await request.json()
  const checkCommunityResponse = checkMandatoryValueString(towerDataToLink.community, MAX_COMMUNITY_LENGTH, 'community')
  if (checkCommunityResponse != null ){return checkCommunityResponse}
  const checkTowerResponse = checkMandatoryValueString(towerDataToLink.propertyfinder_tower, MAX_COMMUNITY_LENGTH, 'propertyfinder tower')
  if (checkTowerResponse != null ){return checkCommunityResponse}
  const checkMasterProjectResponse = checkMandatoryValueString(towerDataToLink.pulse_master_project, MAX_COMMUNITY_LENGTH, 'pulse master project')
  if (checkMasterProjectResponse != null ){return checkCommunityResponse}
  const checkBuildingResponse = checkMandatoryValueString(towerDataToLink.pulse_building_name, MAX_COMMUNITY_LENGTH, 'pulse building name')
  if (checkBuildingResponse!= null ){return checkCommunityResponse}

  try{ 
    const result = await link(towerDataToLink.community, towerDataToLink.propertyfinder_tower, towerDataToLink.pulse_master_project, towerDataToLink.pulse_building_name)
    if (result.isValid){
      return new Response(new Blob(['created']), {status: 201})
    }else{
      return new Response(new Blob([result.message]), {status: 403, statusText: result.message})
    }

  }catch (exception){
    console.log(exception)
    return new Response(new Blob(['error fetching data']), {status: 500})
  }
}



