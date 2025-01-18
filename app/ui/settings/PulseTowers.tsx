'use client'
import * as React from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export default function PulseTowers({masterProject, pulseTowers, setCurrentPulseBuilding, isError, isDisabled}:
                                   {masterProject:string|null|undefined, pulseTowers:string[], setCurrentPulseBuilding:(b:string)=>void, isError:boolean, isDisabled:boolean}){
  const onChange= (
      event: React.SyntheticEvent | null,
      newValue: string | null,
      ) => {
        if (newValue== null){
          console.log(`PulseTowers new value null. abort`)
        }
        setCurrentPulseBuilding(newValue!)
      }

  return (
          <FormControl error={isError} >
            <FormLabel>Pulse Master Project: {masterProject} </FormLabel>
            <Autocomplete
              disabled={isDisabled}
              placeholder="Pulse Tower.."
              options={pulseTowers} 
              onChange={onChange}
              />
              <FormHelperText >Pulse Tower</FormHelperText >
            </FormControl>
         )
}
