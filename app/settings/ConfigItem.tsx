'use client'
import Grid from '@mui/material/Grid2';
import Input from "@mui/joy/Input"
import Button from "@mui/joy/Button"
import {useState} from 'react'
import {toast} from 'sonner'
import {update_setting} from '@/app/settings/UpdateSetting'


export default function ConfigItem(props:{config_key:string, type:'text'|'number', 
                                    string_value: string, int_value:number, 
                                    label: string, description:string}){
let c = props.string_value
 if (props.type ==='number') {
   c = props.int_value
 }

 const [current_value, setCurrentValue] = useState(c)
 const [current_type, setCurrentType] = useState(props.type)
 const [current_key, setCurrentKey] = useState(props.config_key)

function save(){
  console.log(`function save: key: ${current_key} type: ${current_type} value: ${current_value}`)
  update_setting(current_key, current_type, current_value)
  .then(status => {
    if (status === 200){
      toast.success('success')
    }else{
      toast.error('update failed, pls check')
    }
  })

  function changeValue(this){
    alert(this.value)
  }
    
  
} 
  return (
   <>
   <Grid size={2}> <b>{props.label}</b> </Grid>
   <Grid size={2}> 
       <Input type={props.type} 
              defaultValue={current_value}
              onChange={ (e) =>{ setCurrentValue(e.target.value) }} 
              endDecorator={<Button onClick={save}>Save</Button>}
              />
                                       
   </Grid>
   <Grid size={7}> {props.description} </Grid>
   </>
 )

}
