import {PerPeriodStatsByAdId} from '@/app/data'
import PropertyStatsClient from '@/app/ui/report/PropertyStatsClient'

export default async function PropertyStats(props: {id: string}){
  const statistics = await PerPeriodStatsByAdId(props.id )

  return (
  <PropertyStatsClient stats={statistics} />

  );
}
