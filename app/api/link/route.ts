import {linkedByCommunity, unlink, link}  from '@/app/data'
import {checkMandatoryValueString, MAX_COMMUNITY_LENGTH} from '@/app/api/values'

function isNotNullAndLenghtLessThan(value: string| null | 'undefined',name: string , maxLength:number):({message: string, status:number}){
  if(value ==null) {
    return {status: 403, message:`${name} is mandatory`}
  }
  if (value.length > maxLength){
    return {status: 403, message:`${name} value too long `}
  }
  return {status: 200, message: "valid"} 

}

export async function GET(request:Request): Promise<Response>{
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  const communityIsValid= isNotNullAndLenghtLessThan(community, 'community',50);
  if ( communityIsValid.status != 200){
    return new Response(new Blob([communityIsValid.message]), 
                         { status: communityIsValid.status, 
                           statusText: communityIsValid.message})
  }
  try{ 
    const response = await linkedByCommunity(community!)
    return Response.json(response)
  }catch(exception ){
    console.log(exception)
    return new Response(new Blob(['error fetching data']), {status: 500})
  }
}

export async function DELETE(request:Request):Promise<Response>{
  console.log("delete link")
  const url = new URL(request.url)
  const community = url.searchParams.get('community')
  const adTower= url.searchParams.get('ad_tower')
  const pulseBuilding= url.searchParams.get('pulse_building')
  if (! isNotNullAndLenghtLessThan(community, 'community',50) == null && 
      ! isNotNullAndLenghtLessThan(adTower, 'propertyfinder tower',50) == null && 
      ! isNotNullAndLenghtLessThan(pulseBuilding, 'pulse building',50) == null){
    console.log(` community ${community} - tower: ${adTower}  - pulse Bulding ${pulseBuilding} check failed!!`)
    
    return new Response(new Blob(["not valid request pls check logs"]), {status: 403, statusText: "request not valid"}) 
  }
  try{ 
    console.log('unlinked')
    await unlink(community!, adTower!, pulseBuilding!)
    return new Response(new Blob(), {status:200, statusText: "unlinked"})
  }catch(exception ){
    console.log(exception)
    const blob = new Blob([`error removing link for community: ${community} ${adTower} ${pulseBuilding}`])
    return new Response(blob , {status: 500})
  }

}

export async function POST(request: Request) : Promise<Response>{
  const towerDataToLink = await request.json()
  const checkCommunityResponse = checkMandatoryValueString(towerDataToLink.community, MAX_COMMUNITY_LENGTH, 'community')
  if (checkCommunityResponse.status != 200){
    return new Response(new Blob([checkCommunityResponse.message]), {status: checkCommunityResponse.status, statusText: checkCommunityResponse.statusText})
  }

  const checkTowerResponse = checkMandatoryValueString(towerDataToLink.propertyfinder_tower, MAX_COMMUNITY_LENGTH, 'propertyfinder tower')
  if (checkTowerResponse.status != 200){
    return new Response(new Blob([checkTowerResponse.message]), {status: checkTowerResponse.status, statusText: checkTowerResponse.statusText})
  }
  
  const checkMasterProjectResponse = checkMandatoryValueString(towerDataToLink.pulse_master_project, MAX_COMMUNITY_LENGTH, 'pulse master project')
  if (checkMasterProjectResponse.status != 200){
    return new Response(new Blob([checkMasterProjectResponse.message]), {status: checkMasterProjectResponse.status, statusText: checkMasterProjectResponse.statusText})
  }
  const checkBuildingResponse = checkMandatoryValueString(towerDataToLink.pulse_building_name, MAX_COMMUNITY_LENGTH, 'pulse building name')
  if (checkBuildingResponse.status != 200){
    return new Response(new Blob([checkBuildingResponse.message]), {status: checkBuildingResponse.status, statusText: checkBuildingResponse.statusText})
  }

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



