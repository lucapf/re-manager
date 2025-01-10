'use client'
import {  Stack } from '@mui/joy';
import { Box, Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import IconButton from '@mui/material/IconButton';
export default function TopBar() {
  return (
    <Box width='100%' height={50} >
    <AppBar position="static" >
        <Toolbar >
         <Grid container spacing={3} width='100%'>
           <Grid size={3}>
            <Button color="white" sx={{fontSize:"large"}} href="/">HOME</Button>|
            <Button color="white" sx={{fontSize:"large"}} href="/report/Dubai%20Marina">Dubai Marina</ Button>|
            <Button color="white" sx={{fontSize:"large"}} href="/report/jlt">JLT</ Button>
          </Grid>
          </Grid>
            <Button color="white" sx={{fontSize:"large"}} href="/settings">Settings</ Button>
        </Toolbar>
    </AppBar>
    </Box>

      )
}

