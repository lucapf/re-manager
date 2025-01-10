'use client'

import Table from "@mui/joy/Table";
import Link from "next/link";
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import {
  formatCurrencyNoDec, formatCurrency, 
  formatInteger, formatDate } from '@/public/util.js';
import { delete_ad,set_as_favorite } from '@/app/report/updateAds'
import { useRef } from 'react'
import { useState} from 'react'



// display data from data.getPropertySummaryData
export default function PropertySummary (props:{property: {
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

  async function updateFavorite(){
    const result = await set_as_favorite(p.id)
     setColor(calculateColor(result.favorite))
  }

  return (
    <Table 
      borderAxis="x"
      color="neutral"
      size="md"
      stripe="odd"
      variant="outlined">
      <thead>
        <tr>
            <th colSpan={2}>
                <Link href={p.url} >[{p.id}] - {p.location} </Link>
                <IconButton onClick={() => {delete_ad(p.id); }}>
                  <DeleteIcon color="error"/>
                </IconButton>
                <IconButton onClick={updateFavorite}>
                  <FavoriteIcon ref={favoriteRef} color={color} id={p.id}/>
                </IconButton>
            </th>
            <th >Score</th>
            <th>{p.score}</th>
        </tr> 
        <tr>
          <th >listed date</th>
          <th >Size (sqft)</th>
          <th >Price (AED)</th>
          <th>AED/sqft</th>
        </tr>
        </thead>
      <tbody>
        <tr>
          <td>{formatDate(p.listed_date)}</td>
          <td>{formatInteger(p.size)}</td>
          <td colSpan={1} >{formatCurrencyNoDec(p.price)}</td>
          <td>{formatCurrency(p.price_sqft)}</td>
        </tr>
      </tbody>
    </Table>
      );

}


