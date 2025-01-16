'use client'
import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function PulseTowers({masterProject, pulseTowers, onTowersSelected, isError, isDisabled}){

  return (
          <FormControl error={isError} >
            <FormLabel>Pulse Master Project: {masterProject} </FormLabel>
            <Autocomplete
              disabled={isDisabled}
              placeholder="Pulse Tower.."
              options={pulseTowers} 
              onChange={onTowersSelected}
              />
              <FormHelperText >Pulse Tower</FormHelperText >
            </FormControl>
         )
}
