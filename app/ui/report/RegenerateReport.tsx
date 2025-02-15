'use client'
import {toast} from 'sonner' 

import Box from '@mui/material/Box'
import Button from '@mui/joy/Button';
import { useState } from 'react'

export default function RegenerateReport({community}:{community:string}){

const [isLoading, setIsLoading] = useState<boolean>(false)
function regenerate(){
     setIsLoading(true)
      fetch(`/be/report/${encodeURIComponent(community)}`,{ method: 'POST'})
      .then(res =>{
        if (res.status == 201){
          res.text().then(() => {location.reload()})
        }else{
          toast.error('unable to enqueue execution job')
          setIsLoading(false)
        } })
  }

  return (
     <Box>
      <Button  onClick={regenerate} loading={isLoading}> Regenerate</Button>
     </Box>
  )
}
