import Box from '@mui/material/Box';
import {SettingsSection, PropertyMappingSection } from '@/app/ui/settings/ConfigSection'
import ProcessSection from '@/app/ui/settings/ProcessSection'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import {getLastJobExecutions} from '@/app/data'


export const dynamic = 'force-dynamic';
export default async function Home(){
  const lastJobExecutions = await getLastJobExecutions()
 return (
   <Box sx={{width: "100%"}}>
   <Tabs sx={{width: "100%"}}>
   <TabList>
    <Tab>Property Mappings</Tab>
    <Tab>Settings</Tab>
    <Tab>Process</Tab>
    </TabList>
    <TabPanel value={0}>
       <PropertyMappingSection/>
    </TabPanel>
    <TabPanel value={1}>
       <SettingsSection />
    </TabPanel>
    <TabPanel value={2}>
       <ProcessSection job_executions={lastJobExecutions}/>
    </TabPanel>
    </Tabs>
   </Box>
    );
}
