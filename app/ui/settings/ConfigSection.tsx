'use server'
import {getStringConfigurationItem, 
        settingsPropertyfinderMasterProject} from "@/app/data"

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ConfigItem from '@/app/ui/settings/ConfigItem'
import {MappingControl} from '@/app/ui/settings/MappingControl'
import MappingWizard from '@/app/ui/settings/MappingWizard'


 
export async function PropertyMappingSection(){
  const communities = await settingsPropertyfinderMasterProject() 
   
  return (
    <>
      <Typography variant="h2"> Towers Mappings </Typography>
      <MappingWizard/>
      <MappingControl communities={communities} />
    </>
    )
}

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


export async function SettingsSection(){
return (
    <>
    <Box sx={{width: '100%', padding: '35px'}}>
      <Typography variant="h2">
        Settings
      </Typography>
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


