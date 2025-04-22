'use client'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/joy/Typography';
import {formatPercentageNoDigit, formatCurrency, formatCurrencyNoDec} from '@/public/util.js' 
import { PropertyStatistics } from '@/app/Interfaces';
import  Table  from '@mui/joy/Table';


export default function PropertyStats(props: {stats: PropertyStatistics[]}){
  const stats = props.stats
  const displayFull = (window.innerWidth > 500);
  return (
    <AccordionGroup>
      <Accordion>
        <AccordionSummary variant="outlined">
          <Grid container spacing={3}>
            <Grid size={12} key={Math.random()}>
              <Typography level="body-xs" fontWeight="bold">
             Summary Stats  
             </Typography>
           </Grid> 

      {stats.map((s) => (
              <Grid key={s.interval} >
                {s.interval}({s.sale_transaction}):&nbsp; 
                {formatPercentageNoDigit(s.current_vs_avg_perc/100)}
              </Grid>
      ))}
      </Grid>
        </AccordionSummary>
        <AccordionDetails>
         <Table size="sm" borderAxis="both" hoverRow  sx={{textAlign:'center'}}>
         <thead>
         <tr>
            <th>interval</th>
           {displayFull && (<th> max</th>)}
           {displayFull && (<th> avg</th>)}
           {displayFull && ( <th> min</th>)}
           {displayFull && (<th> max/sqft</th>)}
            <th> avg/sqft</th>
           {displayFull && ( <th> min/sqft</th>)}
            <th> sales</th>
            <th>dev/avg %</th>
          </tr>
          </thead>
          <tbody >

      {stats.map((s) => {
        return (
        <tr key={Math.random()}>
             <td>{s.interval}</td>
             {displayFull && (<td>{formatCurrencyNoDec(s.max_price)}</td>)}
             {displayFull && (<td>{formatCurrencyNoDec(s.avg_price)}</td>)}
             {displayFull && (<td>{formatCurrencyNoDec(s.min_price)}</td>)}
             {displayFull && (<td>{formatCurrency(s.max_price_sqft)}</td>)}
             <td>{formatCurrency(s.avg_price_sqft)}</td>
             {displayFull && (<td>{formatCurrency(s.min_price_sqft)}</td>)}
             <td>{s.sale_transaction}</td>
             <td>{formatPercentageNoDigit(s.current_vs_avg_perc/100)}</td>
         </tr>
      )})}
      </tbody>
      </Table>
        </AccordionDetails>
      </Accordion>
  </AccordionGroup>
  );
}
