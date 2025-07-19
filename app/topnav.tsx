'use client'
import { Box} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from 'next/link' 
export default function TopBar() {
  return (
    <Box width='100%' height={50} >
    <AppBar position="static" >
        <Toolbar >
           <Stack direction="row" spacing={3} width='100%'>
           <Link href="/"><Typography color="inherited" >HOME</Typography></Link>
           <Link href="/ui/report/Dubai%20Marina">
             <Typography color="inherited" >Dubai Marina</Typography></Link>
           <Link href="/ui/report/Jumeirah%20Lake%20Towers">
              <Typography color="inherited">JLT</Typography></Link>
           <Link href="/ui/report/Jumeirah%20Beach%20Residence">
              <Typography color="inherited">JBR</Typography></Link>
           </Stack>
           <Link href="/ui/settings"><Typography color="inherited">Settings</Typography></Link>
        </Toolbar>
    </AppBar>
    </Box>

      )
}

