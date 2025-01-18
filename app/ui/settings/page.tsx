'use server'
import Box from '@mui/material/Box';
import {SettingsSection, PropertyMappingSection} from '@/app/ui/settings/ConfigSection'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';

export default async function Home(){
 return (
   <Box sx={{width: "100%"}}>
   <Tabs sx={{width: "100%"}}>
   <TabList>
    <Tab>  Property Mappings</Tab>
    <Tab>  Settings</Tab>
    </TabList>
    <TabPanel value={0}>
       <PropertyMappingSection/>
    </TabPanel>
    <TabPanel value={1}>
       <SettingsSection />
    </TabPanel>
    </Tabs>
   </Box>
    );
}
