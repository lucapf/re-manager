'use client'
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {PFCommunities} from '@/app/ui/settings/PFCommunities'
import {useRef }  from 'react'
import {useState, useEffect}  from 'react'
import {getPFTowersByCommunity, 
        getLinkedTowersByCommunity, 
        getPulseTowersByCommunity, 
        linkTowerToBuilding,syncAdsStats
        } from '@/app/ui/settings/settings'
import PFTowers from '@/app/ui/settings/PFTowers'
import LinkedTowers from '@/app/ui/settings/LinkedTowers'
import PulseTowers from '@/app/ui/settings/PulseTowers'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/joy/Button';
import {LinkedTower } from '@/app/Interfaces'
import LinearProgress  from '@mui/material/LinearProgress';



export function MappingControl(props:{communities: string[]}){

const selectedCommunity= useRef("")
const [totalAds, setTotalAds] = useState<number>(0)
const [linkedAds, setLinkedAds] = useState<number>(0)
const [masterProject, setMasterProject] = useState<string|null>()
const [pfTowers, setPfTowers] = useState<{label:string, id:string}[]>([{label:'', id:''}])
const [linkedTowers, setLinkedTowers] = useState<LinkedTower[]|null|undefined>()
const [pulseTowers, setPulseTowers] = useState<string[]>(['no towers'])
const [currentPulseBuilding, setCurrentPulseBuilding] = useState<string|null>()
const [currentPFTower, setCurrentPFTower] = useState<{label:string, id:string}>()
const [isErrorCommunity, setIsErrorCommunity] = useState<boolean|null>(false)
const [isErrorPFTowers, setIsErrorPFTowers] = useState<boolean>(false)
const [isErrorPulseTower, setIsErrorPulseTower] = useState<boolean>(false)

const [isDisabledPFTowers, setIsDisabledPFTowers] = useState<boolean>(true)
const [isDisabledPulseTower, setIsDisabledPulseTower] = useState<boolean>(true)

function updatePulseMasterProject (community: string) {
  fetch(`/manager/api/pulse/masterProject?community=${community}`)
.then(res =>{
      if (res.status == 200){
        res.text().then((mp) => {setMasterProject(mp)})
      }else{
        setMasterProject('Error')
      } })
}

const onSelectCommunity = (community:string) => {
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

useEffect(() =>{
    if (selectedCommunity.current == ''){
      return
    }
    syncAdsStats(selectedCommunity.current, setTotalAds, setLinkedAds)
  }, [selectedCommunity.current])

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
                        propertyfinder_tower: currentPFTower.id,
                        pulse_master_project: masterProject,
                        pulse_building_name: currentPulseBuilding
                      }
    linkTowerToBuilding(postData, setLinkedTowers )
  }
}

 return (
   <>
      <LinearProgress variant='determinate' sx={{width: 200, marginTop:2, marginBottom: 2}} 
        value={100*linkedAds/totalAds} />
    <Typography variant='h5' > Total Ads: {totalAds} , linked {linkedAds}</Typography>

    <Box sx={{width: '100%', padding: '35px', alignContent: 'flex-left', }}>
      <Grid container spacing={3} margin={3}
            sx={{width:'100%',  alignItems: "center", }}>
          <Grid size={{md:3, xs:12}}>
              <PFCommunities 
                  onSelectCommunity={onSelectCommunity}
                  communities={props.communities}
                  isError={isErrorCommunity!}
                  />
          </Grid>
          <Grid size={{md:3, xs:6}}>
             <PFTowers 
             towers={pfTowers} 
             setCurrentPFTower={setCurrentPFTower}
             isError={isErrorPFTowers}
             isDisabled={isDisabledPFTowers}
             />
          </Grid>
          <Grid size={{md:3, xs:12}}> 
             <PulseTowers 
               isError={isErrorPulseTower}
               masterProject={masterProject} 
               pulseTowers={pulseTowers} 
               setCurrentPulseBuilding={setCurrentPulseBuilding}
               isDisabled={isDisabledPulseTower}
            />

          </Grid>
          <Grid size={{md:3, xs:12}}>
            <Stack direction="row" spacing={2}>
              <Button startDecorator={<AddBoxIcon />} onClick={link} component='a'>
                 Link
              </Button>
            </Stack>
          </Grid>
           <Grid>
              <LinkedTowers linkedTowers={linkedTowers}/>
          </Grid>        
      </Grid>
  </Box>
  </>
 )
}

 
