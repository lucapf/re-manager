'use server'
import { Box, Card, Divider, Typography } from '@mui/material';
import { countPulseTransaction, countPropertyfinderTransaction, } from '@/app/data';

export default async function SingleValueCard (props: {countType:string}) {
  let valueCount = 0
  let title= "Pulse Sales"
  if ( props.countType === "pulse"){
     valueCount = (await countPulseTransaction()).count;
  }else{
     title = "Advertising"
     valueCount = (await countPropertyfinderTransaction()).count;
  }
  console.log(`singleValueCard: ${valueCount}`)
  return (
      <Card variant="outlined" sx={{maxWidth: 360 }}>
        <Box sx={{p:2}}>
        <Typography variant='h6' gutterBottom component="div" sx={{fontWeight: "bold"}}>
          {title}
        </Typography>
        </Box>
        <Divider />
        <Box sx={{p:2}}>
        <Typography variant='h3' sx={{textAlign: "center", fontWeight:"bold"}}> 
          {valueCount}
        </Typography>
        </Box>
      </Card>
  );
}
