'use client'
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export default function PFTowers({towers, setCurrentPFTower, isError, isDisabled}: 
                                 {towers: {label: string, id:string}[], setCurrentPFTower:(t:{label: string, id:string})=>void, isError:boolean, isDisabled:boolean} ){
  
    const onChange=  (
    event: React.SyntheticEvent | null,
    newValue:  {label: string, id:string} | null
    ) => {
    let v = newValue
    if (v == null){
      v = {label:'', id:''}
      
    }
      setCurrentPFTower(v)
    }


  return (
   <FormControl error={isError}>
    <FormLabel>Towers:</FormLabel>
    <Autocomplete 
             disabled={isDisabled}
             placeholder="Propertyfinder Tower..."
             key="ListPFTowers" 
             options={towers}
             onChange={onChange}
    />
    <FormHelperText>Propertyfinder towers</FormHelperText> 
  </FormControl>
        ) 
}

