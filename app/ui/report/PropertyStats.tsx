import {PerPeriodStatsByAdId} from '@/app/data'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Table from "@mui/joy/Table"
import Typography from '@mui/joy/Typography';
import {formatPercentageNoDigit, formatCurrency, formatCurrencyNoDec} from '@/public/util.js' 

             
             // <td>{ formatPercentageNoDigit(s.current_vs_avg_perc/100)}</td>
//
export default async function PropertyStats(props: {id: string}){
  const stats = await PerPeriodStatsByAdId(props.id )
  console.log(`ad ${props.id}  - found ${stats.length} records`)
  return (
    <AccordionGroup>
      <Accordion>
        <AccordionSummary variant="outlined">
        <Table size="sm" borderAxis="yBetween">
          <tbody>
            <tr>
            <td>
              <Typography level="body-xs" fontWeight="bold">
             Summary Stats  
             </Typography>
            </td>
      {stats.map((s) => (
            <td key={s.interval}>
                {s.interval}&nbsp;({s.sale_transaction}):&nbsp; 
                {formatPercentageNoDigit(s.current_vs_avg_perc/100)}
            </td>
      ))}
             </tr>
          </tbody>
        </Table>
        </AccordionSummary>
        <AccordionDetails >
        <Table size="sm" borderAxis="both" hoverRow  sx={{textAlign:'center'}}>
          <thead>
              <tr>
                <th colSpan={4} > Absolute prices</th>
                <th colSpan={5}> Per Sqft prices</th>
              </tr>
              <tr>
               <th>interval</th>
               <th>max</th>
               <th>avg</th>
               <th>min</th>
               <th>max</th>
               <th>avg</th>
               <th>min</th>
               <th>sales</th>
               <th>dev/avg %</th>
             </tr>
          </thead>
          <tbody>
      {stats.map((s) => {
        const key = `d_${s.interval}`
        return (
          <tr key={key}>
            <td>{s.interval}</td>
            <td>{formatCurrencyNoDec(s.max_price)}</td>
            <td>{formatCurrencyNoDec(s.avg_price)}</td>
            <td>{formatCurrencyNoDec(s.min_price)}</td>
            <td>{formatCurrency(s.max_price_sqft)}</td>
            <td>{formatCurrency(s.avg_price_sqft)}</td>
            <td>{formatCurrency(s.min_price_sqft)}</td>
            <td>{s.sale_transaction}</td>
            <td>{ formatPercentageNoDigit(s.current_vs_avg_perc/100)}</td>
          </tr>
      )})}
          </tbody>
         </Table>
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


