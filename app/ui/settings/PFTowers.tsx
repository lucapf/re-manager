'use client'
import Autocomplete from '@mui/joy/Autocomplete';
import FormControl from '@mui/joy/FormControl';
import FormHelperText from '@mui/joy/FormHelperText';
import FormLabel from '@mui/joy/FormLabel';

export default function PFTowers({towers, setCurrentPFTower, isError, isDisabled}: 
                                 {towers: string[], setCurrentPFTower:(t:string|null)=>void, isError:boolean, isDisabled:boolean} ){

  const onChange=  (
    event: React.SyntheticEvent | null,
    newValue: string | null,
    ) => {
      setCurrentPFTower(newValue)
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

