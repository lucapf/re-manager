import pg from 'pg'
import 'dotenv/config'
const { Client } = pg

export async function getConfigIntValue(key: string){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
              select int_value from configuration where key=$1`, [key])
  await client.end()
  return values.rows[0].int_value
}

export async function discard_ad(ad_id: string){
  const client = new Client()
  await client.connect()
  await client.query(`
              update propertyfinder set user_discarded = true where id=$1
                    `, [ad_id])
  await client.end()
}

export async function update_favorite(ad_id: string){
  const client = new Client()
  await client.connect()
  await client.query(`
              update propertyfinder set favorite= not favorite where id=$1
                    `, [ad_id])
  const value = await client.query("select favorite from propertyfinder where id=$1", [ad_id])
  await client.end()
  return value.rows[0].favorite
}
export async function countPulseTransaction(){
  const client = new Client()
  await client.connect()
  const values = await client.query("select count(transaction_id) from pulse")
  await client.end()
  return values.rows[0]
}

export async function countPropertyfinderTransaction(){
  const client = new Client()
  await client.connect()
  const values = await client.query("select count(id) from propertyfinder")
  await client.end()
  return values.rows[0]
}

export async function supportedAreas(){
  const client = new Client()
  await client.connect()
  const values = await client.query("select name, pulse_master_project, image, pf_community from propertyfinder_pulse_area_mapping")
  await client.end()
  return values.rows;
}

export async function getSupportedTypes():Promise<string[]> {

  const client = new Client()
  await client.connect()
  const supported_types = (await client.query(`
                    select str_value from configuration where key='supported.types'
                                      `))
                                      .rows[0]
                                      .str_value
                                      .split(',')
  await client.end()
  return supported_types
}


export async function relevantByCommunity( community: string){
  const client = new Client()
  await client.connect()
  const relevant = await client.query("select count(*) as count from report_propertyfinder where score < 0 and community = $1", [community])
  const favorites= await client.query("select count(*) as count from propertyfinder where favorite = true  and community = $1", [community])  
  await client.end()
  return  [ favorites.rows[0].count , relevant.rows[0].count]
}



export async function salesByCommunity(master_project: string) {
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      select count(transaction_id), building_name, date_trunc('month',instance_date)
      from pulse
      where  building_name is not null  and master_project = $1
      group by 2,3 order by 3 desc, 1 desc  limit 100; `, 
    [master_project])
  await client.end()
  return values.rows;
}

export async function ReportSalesData(ad_id: string, spike: boolean){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
         select 
           p.transaction_id as transaction_id ,
           p.instance_date as instance_date, 
           p.actual_worth as price , 
           p.price_sqft as price_sqft, 
           p.size_sqft as size_sqft, 
           p.building_name  as building_name
         from pulse p join report_propertyfinder r 
                           on r.pulse_transaction_id = p.transaction_id
         where 
               r.propertyfinder_id = $1
           and r.is_spike = $2 
         order by instance_date desc`, [ad_id.toString(), spike])
         console.log(`ad_id: ${ad_id} spike: ${spike}`)
  await client.end()
  return values.rows;
}

export async function PerPeriodStatsByAdId(ad_id: string){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
    select 
     interval, 
     min_price, 
     max_price, 
     avg_price, 
     max_price_sqft, 
     min_price_sqft, 
     avg_price_sqft, 
     current_vs_avg_perc, 
     sale_transaction 
    from report_per_period_statistics
    where propertyfinder_id = $1 
    order by 
     replace(interval, '+','1')::int  asc
    `, [ad_id ])

  await client.end()
  return values.rows;
}


export async function getReportStatsByType(community: string){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      select count(distinct p.id) as count, p.bedrooms as bedrooms   from 
      propertyfinder p join report_propertyfinder r on r.propertyfinder_id = p.id 
      where p.community= $1  and score < 0 and user_discarded = false group by 2
      `, [community ])
    console.log (`found ${values.rowCount} to map for community ${community}`)
  await client.end()
  const map = new Map()
  values.rows.map(r =>  map.set(r.bedrooms, r.count))
  return map
}

const PROPERTY_SUMMARY_SELECT=`
    select distinct 
       p.id as id,
       p.location_name as location, 
       p.url as url, 
       p.price as price, 
       p.size as size, 
       p.listed_date as listed_date, 
       p.id as id, 
       r.score as score,
       p.price_sqft as price_sqft,
       p.listed_date as listed_date,
       p.favorite as is_favorite
    from 
      propertyfinder p join report_propertyfinder r on r.propertyfinder_id = p.id 
    where 
` 
const PROPERTY_SUMMARY_ORDER_BY=`
      and score < 0
    order by score asc 
`
export async function getPropertySummaryData(community: string, bedrooms: string ){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      ${PROPERTY_SUMMARY_SELECT}
          p.community= $1 
      and bedrooms = $2 
      and user_discarded=false
      ${PROPERTY_SUMMARY_ORDER_BY}`, 
    [community, bedrooms])
    console.log (`found ${values.rowCount} properties`)
  await client.end()
  return values.rows;
}
export async function getPropertySummaryDataFavorite( ){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      ${PROPERTY_SUMMARY_SELECT}
          p.favorite = true
      and p.user_discarded=false
      ${PROPERTY_SUMMARY_ORDER_BY}`)
    console.log (`found ${values.rowCount} properties`)
  await client.end()
  return values.rows;
}
