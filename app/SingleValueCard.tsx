import * as React from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import {toHumanValue} from "@/public/util.js"

export async function SingleValueCard (props: {title: string, value: number}) {
  console.log(props.value)
  return (
      <Card variant="outlined" sx={{maxWidth: 360 }}>
        <Box sx={{p:2}}>
        <Typography variant='h6' gutterBottom component="div" sx={{fontWeight: "bold"}}>
          {props.title}
        </Typography>
        </Box>
        <Divider />
        <Box sx={{p:2}}>
        <Typography variant='h3' sx={{textAlign: "center", fontWeight:"bold"}}> 
          {toHumanValue(props.value)}
        </Typography>
        </Box>
      </Card>
  );
}
