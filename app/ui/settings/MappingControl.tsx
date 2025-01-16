'use client'
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {PFCommunities} from '@/app/ui/settings/PFCommunities'
import {PulseMasterProject} from '@/app/ui/settings/PulseMasterProject'
import {useRef, useEffect}  from 'react'
import {useState}  from 'react'
import {getPFTowersByCommunity, 
        getLinkedTowersByCommunity, 
        getPulseTowersByCommunity, 
        linkTowerToBuilding,
        } from '@/app/ui/settings/settings'
import PFTowers from '@/app/ui/settings/PFTowers'
import LinkedTowers from '@/app/ui/settings/LinkedTowers'
import PulseTowers from '@/app/ui/settings/PulseTowers'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/joy/Button';

//const fetcher = (...args) => fetch(...args).then(res => res.text())


export function MappingControl(props:{communities: string[]}){

const selectedCommunity= useRef(null)
const [masterProject, setMasterProject] = useState()
const [pfTowers, setPfTowers] = useState()
const [linkedTowers, setLinkedTowers] = useState()
const [pulseTowers, setPulseTowers] = useState()
const [currentPulseBuilding, setCurrentPulseBuilding] = useState()
const [currentPFTower, setCurrentPFTower] = useState()
const [isErrorCommunity, setIsErrorCommunity] = useState(false)
const [isErrorPFTowers, setIsErrorPFTowers] = useState(false)
const [isErrorPulseTower, setIsErrorPulseTower] = useState(false)

const [isDisabledPFTowers, setIsDisabledPFTowers] = useState(true)
const [isDisabledPulseTower, setIsDisabledPulseTower] = useState(true)

function updatePulseMasterProject (community: string) {
  fetch(`/api/pulse/masterProject?community=${community}`)
.then(res =>{
      if (res.status =='200'){
        res.text().then((mp) => {setMasterProject(mp)})
      }else{
        setMasterProject('Error')
      } })
}


const selectCommunity = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
    ) => {
      selectedCommunity.current = newValue
      updatePulseMasterProject(selectedCommunity.current)
      getPFTowersByCommunity(selectedCommunity.current, setPfTowers, false);
      getLinkedTowersByCommunity(selectedCommunity.current, setLinkedTowers)
      getPulseTowersByCommunity(selectedCommunity.current, setPulseTowers,false )
      if (newValue != null){
       setIsErrorCommunity(false) 
       setIsErrorPulseTower(false)
       setIsErrorPFTowers(false)
       setIsDisabledPFTowers(false)
       setIsDisabledPulseTower(false)
      }
      
    };
const onCurrentPulseBuildingChange = (
    event: React.SyntheticEvent | null,
    newValue: string | null,
    ) => {
      setCurrentPulseBuilding(newValue)
    }

const onCurrentPFTowerChange =  (
    event: React.SyntheticEvent | null,
    newValue: string | null,
    ) => {
      setCurrentPFTower(newValue)
    }


const link = () =>{

  setIsErrorCommunity((selectedCommunity.current  == null) );
  setIsErrorPFTowers((currentPFTower == null));
  setIsErrorPulseTower((currentPulseBuilding == null));
  
  if (selectedCommunity.current != null && 
      currentPFTower != null &&  
      currentPulseBuilding != null && 
      masterProject != null){
    const postData = {
                        community: selectedCommunity.current, 
                        propertyfinder_tower: currentPFTower,
                        pulse_master_project: masterProject,
                        pulse_building_name: currentPulseBuilding
                      }
    const isLinked =  linkTowerToBuilding(postData, setLinkedTowers, setPfTowers, setPulseTowers)
  }
}



 return (
  <Grid container spacing={3} margin={3} sx={{justifyContent: "center", alignItems: "center", }}>
      <Grid size={12}>
        <Typography variant="h2">
         PropertyMapping 
        </Typography>
      </Grid>
      <Grid size={3}>
          <PFCommunities 
              onCommunitySelected={selectCommunity} 
              communities={props.communities}
              isError={isErrorCommunity}
              />
      </Grid>
      <Grid size={3}>
         <PFTowers 
         towers={pfTowers} 
         onTowersSelected={onCurrentPFTowerChange}
         isError={isErrorPFTowers}
         isDisabled={isDisabledPFTowers}
         />
      </Grid>
      <Grid size={3}>
         <PulseTowers 
           isError={isErrorPulseTower}
           masterProject={masterProject} 
           pulseTowers={pulseTowers} 
           onTowersSelected={onCurrentPulseBuildingChange}
           isDisabled={isDisabledPulseTower}
        />

      </Grid>
      <Grid size={3}    >
        <Button fontSize='large' startDecorator={<AddBoxIcon />} onClick={link}>
           Link
        </Button >
      </Grid>
      <Grid size={12}>
          <LinkedTowers linkedTowers={linkedTowers}/>
      </Grid>
  </Grid>
 )
}
