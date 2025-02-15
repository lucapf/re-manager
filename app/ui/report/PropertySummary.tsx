'use client'

import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import  Grid  from "@mui/material/Grid2";
import Chip from '@mui/material/Chip'
import {
  formatCurrencyNoDec, formatCurrency, 
  formatInteger, formatDate } from '@/public/util.js';
import { delete_ad,get_labels,set_as_favorite } from '@/app/ui/report/updateAds'
import { useRef } from 'react'
import { useState } from 'react'



// display data from data.getPropertySummaryData
export default function PropertySummary (props:{ property: {
                                                            id: string,
                                                            url: string, 
                                                            location: string, 
                                                            score: number, 
                                                            listed_date: Date, 
                                                            size: number, 
                                                            price: number, 
                                                            price_sqft: number,
                                                            is_favorite: boolean
                                                           }}){
  const p = props.property
  const favoriteRef = useRef(null)
 
  function calculateColor(favorite: boolean): "disabled" | "success"{
      if (favorite){
        return 'success'
      }
      return 'disabled'
  }
  const choosenColor = calculateColor(p.is_favorite);
 
  const [color, setColor] = useState(choosenColor)
  const [labels, setLabels] = useState<string[]>()




  async function updateFavorite(){
    const result = await set_as_favorite(p.id)
     setColor(calculateColor(result.favorite))
  }
 if (labels == null){
    get_labels(p.id, setLabels, window.location.origin)
 }

  return (
    <Grid container spacing={2} margin={0} padding={1}
    sx={{
        '--Grid-borderWidth': '1px',
        borderTop: 'var(--Grid-borderWidth) solid',
        borderLeft: 'var(--Grid-borderWidth) solid',
        borderColor: 'divider'

      }}>
      <Grid size={{xs:10, md:7}} >
        <Link href={p.url} >[{p.id}] - {p.location} </Link>
      </Grid>
      <Grid size={2}>
        <IconButton onClick={() => {delete_ad(p.id); }}>
          <DeleteIcon color="error"/>
        </IconButton>
        <IconButton onClick={updateFavorite}>
          <FavoriteIcon ref={favoriteRef} color={color} id={p.id}/>
        </IconButton>
      </Grid>
      <Grid size={{xs: 12, md:3}}>
        Score: <b>{p.score}</b>
      </Grid>
      <Grid size={{xs: 12, md:2}}>
        listed date: <b>{formatDate(p.listed_date)}</b>
      </Grid>
      <Grid size={{xs: 12, md:2}}>
        Size (sqft): <b>{formatInteger(p.size)}</b>
      </Grid>
      <Grid size={{xs: 12, md:2}}>
          Price (AED): <b>{formatCurrencyNoDec(p.price)}</b>
      </Grid>
      <Grid size={{xs: 12, md:2}}>
          AED/sqft: <b>{formatCurrency(p.price_sqft)}</b>
      </Grid>
      <Grid size="auto"></Grid>
      <Grid size={12} >
        {labels != null && labels.map((l) =>{
          return ( <Chip label={l} color="success" key={Math.random()} />)
        })}

      </Grid>
  </Grid>
  )
}
// props.labels.get(p.id) != null && (props.labels.get(p.id)!.map( (label ) => {
//           return (
//             <Chip label={label} color="primary" variant="outlined"/>
//           )
//         }))



