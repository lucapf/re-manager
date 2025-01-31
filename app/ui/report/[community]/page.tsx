'use server'
import PropertyCard from '@/app/ui/dashboard/PropertyCard';
import {getReportStatsByType, getSupportedTypes, getConfigIntValue}  from '@/app/data'
import {Stack} from '@mui/joy'
import Tabs from '@mui/joy/Tabs';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Badge from '@mui/joy/Badge';
import Typography from '@mui/material/Typography';
import RegenerateReport from '@/app/ui/report/RegenerateReport'

import {stringify_property_type, 
        numerize_property_type, 
        } from '@/public/util.js'

type Params = Promise<{ community: string }>

export default  async function Home(context: { params: Params }){
  function regenerate(){
    alert("regenerate")
  }
   const p = await context.params;
   const community = await decodeURIComponent(p.community);
   const supported_types = await getSupportedTypes();
   const countByType = await getReportStatsByType(community)
   console.log(countByType)
   const deltaperc = await getConfigIntValue('report.delta_perc') 
   const thresholdSpikes = await getConfigIntValue('report.spike_threshold_perc')
   return  (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <RegenerateReport community={community}/>
     <Tabs>
     <TabList >

     {supported_types.map((t) => {
       let number_of_elements = countByType.get(t)
       let disabled = false
       if (number_of_elements === undefined ){
         number_of_elements = "0"
         disabled = true
       }
       const tabKey = `tab_${t}`
       console.log(`has #${t}# property ${countByType.get(t)}`)
       return (
         <Tab disabled={disabled} key={tabKey} > 
           <Badge badgeContent={number_of_elements} id={tabKey}>
              <Typography variant="h5" gutterBottom >
                {stringify_property_type(t)} 
              </Typography>
            </Badge>
          </Tab>
     
     )})}
     </TabList>
     {supported_types.map((t) => {
     const key = `PropertyCard_${t}`
     return(
             <TabPanel key={key} value={numerize_property_type(t)}>
                <PropertyCard 
                  community={community} 
                  property_type={t} 
                  spike_threshold={thresholdSpikes} 
                  threshold={deltaperc}
                />
             </TabPanel>
     )})}
     </Tabs>
     </Stack>
    );
}
