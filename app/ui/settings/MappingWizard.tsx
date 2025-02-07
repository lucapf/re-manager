'use client'
import Button from '@mui/joy/Button';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'
import { useState } from 'react';

export default function SettingsSection(){
  const [logProgress, setLogProgress] = useState<string>('') 
  let is_running = false 
  function match(){
   if (is_running){
      alert("two requests at the same time")
      return
    }
    is_running = true
   let log = '';
   ["Dubai Marina", "Jumeirah Lake Towers"].map((c) => {
      log =`${log}\n${c}: start`
      setLogProgress(log)
      const matchReq= new Request(`/be/link/${c}`,{method: 'POST'})
      fetch(matchReq)
      .then((response) =>{
            if (response.status == 201){
            log = `${log}\n ${c}: done`
            setLogProgress(log)
          }else{
            log = `${log}\n ${c}: error`
            setLogProgress(log)
          }
        }).finally(() => {is_running=false})
    })


  }
  return (
  <Stack>
    <Button startDecorator={<AutoFixHighIcon/>} sx={{maxWidth: 200 }} onClick={match} >Match</Button> 
      <Box> <pre>{logProgress}</pre></Box>
  </Stack>)
}
