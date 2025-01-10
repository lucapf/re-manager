'use server'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import ConfigItem from '@/app/settings/ConfigItem'

import {getStringConfigurationItem} from "@/app/data"


async function WriteItem(props:{config_key:string, type: 'text'| 'number'}){
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


export default async function Home(){

  return (
    <>
    <Typography variant="h2">
      Settings
    </Typography>
    <Box sx={{width: '100%', padding: '35px'}}>
    <Grid container spacing={2}>
    <WriteItem config_key="supported.types" type="text"/>
    <WriteItem config_key="report.max_price" type="number"/>
    <WriteItem config_key="report.delta_perc" type="number"/>
    <WriteItem config_key="report.max_sales_days" type="number"/>
    <WriteItem config_key="report.relevant_properties_min_score" type="number"/ >
    <WriteItem config_key="report.spike_threshold_perc" type="number"/>
    <WriteItem config_key="sales.candidates_tower_min_age_years" type="number"/>
    </Grid>
    </Box>
    </>


  );
}
