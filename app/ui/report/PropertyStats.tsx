import {PerPeriodStatsByAdId} from '@/app/data'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Grid from '@mui/material/Grid2'
import Typography from '@mui/joy/Typography';
import {formatPercentageNoDigit, formatCurrency, formatCurrencyNoDec} from '@/public/util.js' 

export default async function PropertyStats(props: {id: string}){
  const stats = await PerPeriodStatsByAdId(props.id )
  console.log(`ad ${props.id}  - found ${stats.length} records`)

  return (
    <AccordionGroup>
      <Accordion>
        <AccordionSummary variant="outlined">
          <Grid container spacing={3}>
            <Grid size={12}>
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
        <AccordionDetails >
          <Grid container spacing={2}>
            <Grid size={4} key={Math.random()}> Absolute prices</Grid>
            <Grid size={8}>Per Sqft prices</Grid>
            <Grid > interval</Grid>
            <Grid > max</Grid>
             <Grid > avg</Grid>
             <Grid > min</Grid>
             <Grid > max</Grid>
             <Grid > avg</Grid>
             <Grid > min</Grid>
             <Grid > sales</Grid>
             <Grid > dev/avg %</Grid>
      {stats.map((s) => {
        return (
         <>
          <Grid size={1}>{s.interval}</Grid>
           <Grid size={1}>{formatCurrencyNoDec(s.max_price)}</Grid>
           <Grid size={1}>{formatCurrencyNoDec(s.avg_price)}</Grid>
           <Grid size={1}>{formatCurrencyNoDec(s.min_price)}</Grid>
           <Grid size={1}>{formatCurrency(s.max_price_sqft)}</Grid>
           <Grid size={1}>{formatCurrency(s.avg_price_sqft)}</Grid>
           <Grid size={1}> {formatCurrency(s.min_price_sqft)}</Grid>
           <Grid size={1}>{s.sale_transaction}</Grid>
           <Grid size={1}>{ formatPercentageNoDigit(s.current_vs_avg_perc/100)}</Grid>
           </>
      )})}
      </Grid>
        </AccordionDetails>
      </Accordion>
  </AccordionGroup>
  );
}
      
        // <tr>
        //   <th></th>
        //   <th></th>
        //   <th></th>
        // </tr>
        //   <tr>
        //
                //
               //
        //   </tr>
        // ))}


