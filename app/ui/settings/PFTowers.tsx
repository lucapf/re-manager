'use client'
import {useState} from 'react'
import Typography from '@mui/material/Typography';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export default function PFTowers({towers, onTowersSelected, isError, isDisabled} ){
  return (
   <FormControl error={isError}>
    <FormLabel>Towers:</FormLabel>
    <Autocomplete 
             disabled={isDisabled}
             placeholder="Propertyfinder Tower..."
             key="ListPFTowers" 
             options={towers}
             onChange={onTowersSelected}
    />
    <FormHelperText>Propertyfinder towers</FormHelperText> 
  </FormControl>
        ) 
}

