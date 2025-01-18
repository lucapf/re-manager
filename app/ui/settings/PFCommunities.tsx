'use client'
import * as React from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export function PFCommunities({onSelectCommunity, communities, isError}:
                              {onSelectCommunity:(c:string)=>void, communities:string[], isError: boolean  } ){
const communitySelectionChange = (
    event: React.SyntheticEvent | null,
    newValue: string|null,
    ) => {
     if (newValue == null){
       console.log(`selected community is null. Abort the hook`)
     }
     onSelectCommunity(newValue!)
    }

    return (    
      <FormControl error={isError}>
       <FormLabel >Community</FormLabel>
      <Select 
        onChange={communitySelectionChange} 
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
