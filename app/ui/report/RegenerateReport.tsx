'use client'
import {toast} from 'sonner' 

import Box from '@mui/joy/Box'
import Button from '@mui/joy/Button'

export default function RegenerateReport({community}:{community:string}){

function regenerate(){
      fetch(`/be/report/${encodeURIComponent(community)}`,{ method: 'POST'})
      .then(res =>{
        if (res.status == 201){
          res.text().then(() => {location.reload()})
        }else{
          toast.error('unable to enqueue execution job')
        } })
  }

  return (
     <Box>
      <Button  onClick={regenerate}> Regenerate</Button>
     </Box>
  )
}
