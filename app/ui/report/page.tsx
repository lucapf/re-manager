import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import Box from '@mui/material/Box';
import {PropertyMappingSection, SettingsSection} from '@/app/ui/settings/ConfigSection'

export default async function Home(){
 return (
   <Box sx={{width:"100%"}}>
   <Tabs>
     <TabList disableUnderline >
       <Tab>Property Mapping</Tab>
       <Tab>Settings</Tab>
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
