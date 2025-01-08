import {  Stack } from '@mui/joy';
import { Box, Button} from '@mui/material';


export default function TopBar() {
  return (
    <Box 
      sx={{ minHeight: '40px', height: '70px' , width: '100%', 
            background: 'blue', alignContent: 'center'
            }}>
      <Stack direction={"row"} spacing={2} sx={{ marginLeft: "30px"}} >
      <Button sx={{
                    marginLeft: "20px", color:'white', borderStyle: "solid", 
                    maxWidth: "130px", minWidth: "130px",
                    borderColor: 'whilte', borderWidth: '1px'}} 
                    href="/" >
          Home</Button>
        <Button sx={{
                    marginLeft: "20px", color:'white', borderStyle: "solid", 
                    maxWidth: "150px",minWidth: "130px",
                    borderColor: 'whilte', borderWidth: '1px'}} 
                    href="/" >
          Report</Button>
      </Stack> 
</Box>
  )

 
}
