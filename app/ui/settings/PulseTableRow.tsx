'use client'
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import {removeLink} from '@/app/ui/settings/settings'
import {useState} from 'react'

export default function PulseTableRow({tableRowKey,  linkedTower}:{tableRowKey:string, linkedTower:{ad_tower:string, pulse_building:string}}){
  const currentLinkedTower = linkedTower
  const [show, setShow]  = useState(true)
  
  function _removeLink() {
    removeLink(currentLinkedTower)
    setShow(false)
  }
  return (
    <>
    { show &&
    <TableRow key={tableRowKey} >
          <TableCell align="right">{linkedTower.ad_tower}</TableCell>
          <TableCell align="right">{linkedTower.pulse_building}</TableCell>
          <TableCell align="right">
            <IconButton onClick={_removeLink}>
              <DeleteIcon color="error" />
            </IconButton>
          </TableCell>
     </TableRow>
    }
    </>
  )

}
