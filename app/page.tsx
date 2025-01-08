import  "@/app/globals.css";
import  { 
          countPulseTransaction, 
          countPropertyfinderTransaction, 
          supportedAreas
        } from '@/app/data';
import PropertyCard from '@/app/ui/dashboard/PropertyCard';
import  {SingleValueCard} from "@/app/ui/dashboard/SingleValueCard";
import  {SummaryAreaCard} from "@/app/ui/dashboard/SummaryAreaCard";
import  Stack from "@mui/joy/Stack";

export default async function Home() {
  const pulseTransaction = (await countPulseTransaction()).count;
  const countAds = (await countPropertyfinderTransaction()).count;
  const areas = await supportedAreas();

  console.log(pulseTransaction)
  console.log(countAds)
  return (
    <Stack spacing={4}>
      <Stack direction="row" spacing={2}>
        <SingleValueCard title="Pulse Sales" value={pulseTransaction }/>
        <SingleValueCard title="Advertising" value={countAds}/>
      </Stack>
       <Stack spacing ={2} direction="row">
        {areas.map((a) => (
          <SummaryAreaCard 
                key={`area_${a.name}`}
                name={a.name} 
                image={a.image} 
                master_project={a.pulse_master_project} 
                community={a.pf_community}
          />
        ))}
        </Stack>
        <Stack>
        <PropertyCard favorites="true" property_type="Favorites"/>
        </Stack>
    </Stack>
  );
}
