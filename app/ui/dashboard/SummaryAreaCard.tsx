import * as React from 'react';
import { Badge, Box, Divider, Typography } from '@mui/material';
import Card  from '@mui/joy/Card'
import CardCover from '@mui/joy/CardCover'
import CardContent from '@mui/joy/CardContent'
import CardActions from '@mui/material/CardActions'
import Stack from '@mui/joy/Stack';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { relevantByCommunity } from '@/app/data';
import  FavoriteIcon  from '@mui/icons-material/Favorite';
import StarsIcon from '@mui/icons-material/Stars';
import Image from 'next/image'

export async function SummaryAreaCard(props: {name: string, image: string, 
                                              master_project: string, community: string}) {
  const community = props.community
  const [favorites_values, relevant]  = await relevantByCommunity(community)
  const report_url = `/report/${props.community}`
  return (
      <Card variant="outlined" sx={{maxWidth: 300, width: 300 }}>
      <CardContent>
          <Grid container sx={{width: '100%' }}>
            <Grid size={12}>
              <Image src={props.image} width={300} height={464} alt={props.name} />
              <Divider />
            </Grid>
            <Grid size={12}>
              <Typography variant='h4' gutterBottom component="div" 
                          sx={{ color: 'black', height:"80px"  }}>
                  {props.name}
              </Typography>
            </Grid>
            <Grid size={4}>
                <Typography variant='h6' >
                  Favorite:
                </Typography> 
            </Grid>
            <Grid size={2}>
                <Typography variant='h6' >
                  {favorites_values} 
                </Typography> 
            </Grid>

            <Grid size={3}>
              <Typography variant='h6' >
               Total:
              </Typography>
            </Grid>
           <Grid size={2}>
                <Typography variant='h6'>
                  {favorites_values} 
                </Typography> 
            </Grid>

          </Grid>
        </CardContent>
        <CardActions>
          <Button href={report_url} >
              Report
          </Button> 
        </CardActions>
      </Card>
  );
}
