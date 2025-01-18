'use client'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import PulseTableRow from '@/app/ui/settings/PulseTableRow'
import {LinkedTower} from '@/app/Interfaces'



export default function LinkedTowers({linkedTowers}:{linkedTowers:LinkedTower[]|null|undefined}){
  console.log("render linked towers triggered")
  if (linkedTowers == null){
    return ("")
  }
  return (
    <Stack>
        Mapped Towers:
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400, maxWidth:400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property Finder </TableCell>
            <TableCell align="right">Pulse </TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {(linkedTowers!).map((linkedTower) => { 
              const rowKey = `${linkedTower.ad_tower}_${linkedTower.pulse_building}`
              return(
              <PulseTableRow key={rowKey} tableRowKey={rowKey} linkedTower={linkedTower} />
            )})}
         </TableBody>
      </Table>
    </TableContainer>
  </Stack>
  )
}
//{link.ad_tower}
//{link.pulse_building}

