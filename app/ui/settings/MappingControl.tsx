'use client'
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {PFCommunities} from '@/app/ui/settings/PFCommunities'
import {useRef }  from 'react'
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
import {LinkedTower } from '@/app/Interfaces'

//const fetcher = (...args) => fetch(...args).then(res => res.text())


export function MappingControl(props:{communities: string[]}){

const selectedCommunity= useRef("")
//const community: string| null = null
//const [community, setCommunity] = useState<string|null>()
const [masterProject, setMasterProject] = useState<string|null>()
const [pfTowers, setPfTowers] = useState<string[]>(['no towers'])
const [linkedTowers, setLinkedTowers] = useState<LinkedTower[]|null|undefined>()
const [pulseTowers, setPulseTowers] = useState<string[]>(['no towers'])
const [currentPulseBuilding, setCurrentPulseBuilding] = useState<string|null>()
const [currentPFTower, setCurrentPFTower] = useState<string|null>()
const [isErrorCommunity, setIsErrorCommunity] = useState<boolean|null>(false)
const [isErrorPFTowers, setIsErrorPFTowers] = useState<boolean>(false)
const [isErrorPulseTower, setIsErrorPulseTower] = useState<boolean>(false)

const [isDisabledPFTowers, setIsDisabledPFTowers] = useState<boolean>(true)
const [isDisabledPulseTower, setIsDisabledPulseTower] = useState<boolean>(true)

function updatePulseMasterProject (community: string) {
  fetch(`/api/pulse/masterProject?community=${community}`)
.then(res =>{
      if (res.status == 200){
        res.text().then((mp) => {setMasterProject(mp)})
      }else{
        setMasterProject('Error')
      } })
}

const onSelectCommunity =(community:string)=>{
      selectedCommunity.current = community
      updatePulseMasterProject(community)
      getPFTowersByCommunity(community, setPfTowers, false);
      getLinkedTowersByCommunity(community, setLinkedTowers)
      getPulseTowersByCommunity(community, setPulseTowers,false )
      if (community != null){
       setIsErrorCommunity(false) 
       setIsErrorPulseTower(false)
       setIsErrorPFTowers(false)
       setIsDisabledPFTowers(false)
       setIsDisabledPulseTower(false)
      }
      
    };


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
    linkTowerToBuilding(postData, setLinkedTowers )
  }
}



 return (
   <>
    <Box sx={{width: '100%', padding: '35px', alignContent: 'flex-left', }}>
      <Typography variant="h2"> Towers Mappings </Typography>
      <Grid container spacing={3} margin={3}
            sx={{width:'100%',  alignItems: "center", }}>
          <Grid size={3}>
              <PFCommunities 
                  onSelectCommunity={onSelectCommunity}
                  communities={props.communities}
                  isError={isErrorCommunity!}
                  />
          </Grid>
          <Grid size={3}>
             <PFTowers 
             towers={pfTowers} 
             setCurrentPFTower={setCurrentPFTower}
             isError={isErrorPFTowers}
             isDisabled={isDisabledPFTowers}
             />
          </Grid>
          <Grid size={3}>
             <PulseTowers 
               isError={isErrorPulseTower}
               masterProject={masterProject} 
               pulseTowers={pulseTowers} 
               setCurrentPulseBuilding={setCurrentPulseBuilding}
               isDisabled={isDisabledPulseTower}
            />

          </Grid>
          <Grid size={3}>
            <Button startDecorator={<AddBoxIcon />} onClick={link} component='a'>
               Link
            </Button>
          </Grid>
           <Grid size={12}>
              <LinkedTowers linkedTowers={linkedTowers}/>
          </Grid>        
      </Grid>
  </Box>
  </>
 )
}

 
