import {ReportSalesData} from '@/app/data'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Typography from '@mui/joy/Typography';
import Table from "@mui/joy/Table"
import {formatPercentageNoDigit, 
        formatCurrency, 
        formatCurrencyNoDec, 
        formatDate, 
        formatInteger} from '@/public/util.js' 

export default async function PropertySales(props: {id: string, spike: string, threshold: number}){
  const spike = props.spike
  console.log(`value for spike: ${spike}`)
  const sales = await ReportSalesData(props.ad_id,spike)
  let title = "Sale Transactions"
  if (props.spike == "true"){
    title = "Spikes"
  }
  title +=` (threshold: ${formatPercentageNoDigit(Number(props.threshold)/100)}, `
  title +=`items: ${sales.length})`
  let display= "block" 
  if (sales.length == 0){
    display= "none" 
  }

  return (
  <AccordionGroup sx={{display: 'block'}}>
    <Accordion sx={{display: {display} }}>
      <AccordionSummary variant="outlined">
        <Typography level="body-xs" fontWeight="bold">
            {title} 
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
         <Table size="sm" borderAxis="both" hoverRow  sx={{textAlign:'center'}}>
         <thead>
         <tr>
           <th>id</th> 
           <th>instance date</th> 
           <th>price (AED)</th>
           <th>price/sqft (AED)</th> 
           <th>size (sqft)</th> 
           <th>tower</th>
         </tr>
         </thead>
         <tbody>
           {sales.map((s) => (
             <tr key={s.transaction_id}>
               <td>{s.transaction_id }</td>
               <td>{formatDate(s.instance_date)}</td>
               <td>{formatCurrencyNoDec(s.price)}</td>
               <td>{formatCurrency(s.price_sqft)}</td>
               <td>{formatInteger(s.size_sqft)}</td>
               <td>{s.building_name}</td>
             </tr>
           ))}
         </tbody>
        </Table>
      </AccordionDetails>
    </Accordion>
  </AccordionGroup>
    );
}
