'use client'
import {syncPropertyFinder, syncPulse} from '@/app/ui/settings/settings'

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';


export default function ProcessSection(props:{job_executions:{id:number,name: string,  status:string, log:string}[]}) {
  return (
    <Grid container spacing={2}>
    <Grid size={2}>
    <Typography variant="h6">Property Finder</Typography>
    </Grid>
    <Grid size={4}>
      <Button variant="contained" onClick={syncPropertyFinder}>Sync</Button>
    </Grid>
    <Grid size={2}>
      <Typography variant="h6">Pulse</Typography>
    </Grid>
    <Grid size={4}>
      <Button variant="contained" onClick={syncPulse} >Sync</Button>
    </Grid>
    <Grid size={12}>
    <Tabs>
      <TabList key="job_execution_summary">
      {props.job_executions.map( (m) => { 
        return ( <Tab key={m.id}>{m.id} - {m.status} {m.name}</Tab>)
      })}
      </TabList>
      {props.job_executions.map( (m, index) =>{
        return ( <TabPanel value={index} key={index}> <pre>{m.log}</pre> </TabPanel>)
      })}
    </Tabs>
    </Grid>

    </Grid>
  )
}

