'use server'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import Stack from '@mui/joy/Stack';
import {List} from '@mui/joy';
import ConfigItem from '@/app/ui/settings/ConfigItem'
import {getStringConfigurationItem, 
        settingsPropertyfinderMasterProject} from "@/app/data"
import Divider from '@mui/joy/Divider';
import {MappingControl} from '@/app/ui/settings/MappingControl'

async function Item(props:{config_key:string, type: 'text'| 'number'}){
   const values = await getStringConfigurationItem(props.config_key) 
   return (<ConfigItem 
             config_key={props.config_key} 
             type={props.type}
             string_value={values.str_value}
             int_value={values.int_value}
             label={values.label}
             description={values.description}
         />)
}


async function PropertyMappingSection(){
  const communities = await settingsPropertyfinderMasterProject() 
   
  return (
    <MappingControl communities={communities} />
    )
}

async function SettingsSection(){
return (
    <>
    <Typography variant="h2">
      Settings
    </Typography>
    <Box sx={{width: '100%', padding: '35px'}}>
      <Grid container spacing={2}>
        <Item config_key="supported.types" type="text"/>
        <Item config_key="report.max_price" type="number"/>
        <Item config_key="report.delta_perc" type="number"/>
        <Item config_key="report.max_sales_days" type="number"/>
        <Item config_key="report.relevant_properties_min_score" type="number"/ >
        <Item config_key="report.spike_threshold_perc" type="number"/>
        <Item config_key="sales.candidates_tower_min_age_years" type="number"/>
      </Grid>
    </Box>
    </>
  );
}


export default async function Home(){
 return (
   <Stack direction="column" spacing={5}>
   <PropertyMappingSection/>
   <Divider />
   <SettingsSection />
   </Stack>
    );
}
