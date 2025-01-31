import  "@/app/ui/globals.css";
import  { supportedAreas } from '@/app/data';
import PropertyCard from '@/app/ui/dashboard/PropertyCard';
import  SingleValueCard from "@/app/ui/dashboard/SingleValueCard";
import  {SummaryAreaCard} from "@/app/ui/dashboard/SummaryAreaCard";
import  Stack from "@mui/joy/Stack";
import Grid from '@mui/material/Grid2';

export const dynamic = 'force-dynamic';
export default async function Home() {
  const areas = await supportedAreas();

  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={2}>
        <SingleValueCard countType = "pulse" />
        <SingleValueCard countType = "ads"  />
      </Stack>

       <Grid container spacing ={2}>
        {areas.map((a) => (
          <Grid size={{ xs: 12, md:3}} key={`area_${a.name}`} >
          <SummaryAreaCard 
                name={a.name} 
                image={a.image} 
                master_project={a.pulse_master_project} 
                community={a.pf_community}
          />
          </Grid>
        ))}
        </Grid>
        <Stack>
        <PropertyCard favorites="true"  property_type="Favorites"/>
        </Stack>
    </Stack>
  );
}
