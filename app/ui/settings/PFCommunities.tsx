'use client'
import * as React from 'react';
import Typography from '@mui/material/Typography';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export function PFCommunities({onCommunitySelected, communities, isError} ){
    return (    
      <FormControl error={isError}>
       <FormLabel >Community</FormLabel>
      <Select 
        onChange={onCommunitySelected} 
        label="Community"
      >
          {communities.map((comm)=> {
           return (
             <Option key={comm} value ={comm}> {comm} </Option>)
          })}
      </Select>
      <FormHelperText>Propertyfinder Communities</FormHelperText>
      </FormControl>
  )
}
