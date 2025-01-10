import { getPropertySummaryData, getPropertySummaryDataFavorite} from "@/app/data";
import  PropertySummary from "@/app/report/PropertySummary"
import  PropertyStats from "@/app/report/PropertyStats"
import  PropertySales from "@/app/report/PropertySales"
import {  Divider,  Stack  } from "@mui/joy"
import {stringify_property_type} from '@/public/util.js'
import Typography from '@mui/material/Typography';


export default async function PropertyCard(props: {community?: string, 
                                                   property_type?: string, 
                                                   spike_threshold?: number, 
                                                   threshold?: number,
                                                   favorites?: string
                                                  }) {
  let properties
  let threshold = props.threshold
  if (typeof threshold === 'undefined'){
    threshold = 0 
  }
  if (typeof props.favorites ==='undefined' && typeof props.community != 'undefined' && typeof props.property_type !='undefined'){
   properties = await getPropertySummaryData(props.community, props.property_type.trim())
  }else{ 
   properties = await getPropertySummaryDataFavorite()
  }
  return (

      <Stack direction="column" spacing={5} margin={2} padding={2}>
      <Typography variant="h4" >
                Type: {stringify_property_type(props.property_type)} 
      </Typography>
         { 
         properties.map((p) => {
         const key = `Summary_${p.id}`
         return(
           <Stack key={key} id={key}>
            <PropertySummary  property={p}/> 
            <PropertyStats id={p.id} />
            <PropertySales ad_id={p.id} spike={false} threshold={threshold}/>
            <Divider/>
           </Stack>
           )}) }
      </Stack>
  )
}



