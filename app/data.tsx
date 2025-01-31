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
              update propertyfinder set favorite= not coalesce(favorite, false) where id=$1
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

export async function countPropertyfinderTransaction():Promise<{count: number}>{
  const client = new Client()
  await client.connect()
  const values = await client.query(`
            select count(id) as count from propertyfinder
                                    `)
  await client.end()
  return values.rows[0]
}

export async function settingsPropertyfinderMasterProject():Promise<string[]>{
  const client = new Client()
  await client.connect()
  const values = await client.query(`select pf_community as community from propertyfinder_pulse_area_mapping`)
    
  //const values = await client.query(`
  //        select distinct propertyfinder_community  as community 
  //        from propertyfinder_pulse_mapping`)
  await client.end()
  return values.rows.map((r) => r.community);
}

export async function decodeCommunity(community:string): Promise<string>{
  const client = new Client()
  await client.connect()
  const values = await client.query(`
          select distinct  pulse_master_project as master_project 
          from propertyfinder_pulse_mapping 
          where propertyfinder_community=$1 limit 1`, [community])
  await client.end()
  return values.rows[0].master_project
}

export async function getPulseTowersByCommunity(community:string, linked: boolean): Promise<string[]>{
  const client = new Client()
  await client.connect()
  let query =`
    select distinct p.building_name as building
    from pulse_tower_mapping  p join propertyfinder_pulse_area_mapping a on a.pulse_master_project = p.master_project 
    where a.pf_community=$1 `
  if (linked == false){
    query += " and p.building_name not in (select pulse_building_name from propertyfinder_pulse_mapping)"
  }
  query += " order by 1 desc"
  console.log(query)
  const values = await client.query(query, [community])
  await client.end()
  return values.rows.map((r) => r.building);
}

export async function towersByCommunity(community:string| null|'undefined', linkedTowers:boolean): Promise<string[]| null>{
  if (community == null){
    return null
  }
  console.log(`towersByCommunity ${community} -  ${linkedTowers}`)
  let query = `
        select distinct propertyfinder_tower as tower 
        from propertyfinder_pulse_mapping 
        where 
              propertyfinder_community=$1 
      `
  if (linkedTowers == false){
    query = `select distinct tower as tower 
            from propertyfinder 
            where community= $1 
            and tower not in (select propertyfinder_tower from propertyfinder_pulse_mapping)
    `
  }
  query += ' order by 1 desc'
  console.log(`propertyfinder towers: ${query}`)
  const client = new Client()
  await client.connect()
  const values = await client.query(query,[community])
  await client.end()
  return values.rows.map((r) => r.tower).filter(r => r != null);
}

export async function link(community: string, adTower: string, masterProject:string, pulseBuilding:string):Promise<{isValid: boolean, message: string}>{
  console.log(`link propertyfinder towers pulse building: ${community} tower: ${adTower} master project: ${masterProject} building: ${pulseBuilding}`)
  const client = new Client()
  await client.connect()
  let sqlQuery = "select count(*) as count from pulse_tower_mapping where master_project=$1 and building_name=$2"
  const masterProjectBuildingNameValid = (await client.query(sqlQuery, [masterProject, pulseBuilding])).rows[0].count
  sqlQuery = "select count(*) as count from propertyfinder_tower_mapping where community=$1 and tower=$2"
  const communityTowerNameValid = ( await client.query(sqlQuery, [community, adTower]) ).rows[0].count
  if (masterProjectBuildingNameValid == 0 || communityTowerNameValid == 0){
      return {'isValid': false, 'message':`Some data not in the dictionary ${community} - ${adTower} vs ${masterProject} - ${pulseBuilding}`}
  }
  sqlQuery = 'select count(*) as count from propertyfinder_pulse_mapping where propertyfinder_community = $1 and propertyfinder_tower= $2 and pulse_master_project=$3 and pulse_building_name=$4'
  const countExistingMatchingRecords = ( await client.query(sqlQuery, [community, adTower, masterProject, pulseBuilding]) ).rows[0].count
  if (countExistingMatchingRecords > 0){
    return {'isValid': false, 'message': 'record already exists'}
  }
  sqlQuery = 'insert into propertyfinder_pulse_mapping (propertyfinder_community, propertyfinder_tower, pulse_master_project, pulse_building_name) values ($1, $2,$3,$4)'
  await client.query(sqlQuery, [community, adTower, masterProject, pulseBuilding])
  await client.end()
  return {'isValid': true, 'message': 'created'}


}

export async function unlink(community: string, adTower:string, pulseBuilding:string){
const client = new Client()
  await client.connect()
  const query = `delete 
          from propertyfinder_pulse_mapping 
          where propertyfinder_community = $1 and 
                pulse_building_name = $2 and 
                propertyfinder_tower = $3`
  console.log(`community ${community} pulse: ${pulseBuilding} tower: ${adTower}`)
  await client.query(query,[community, pulseBuilding, adTower])
  await client.end()
}
export async function linkedByCommunity(community:string ){
  const query =`
      select distinct 
          propertyfinder_community as community,
          propertyfinder_tower as ad_tower, 
          pulse_building_name  as pulse_building
      from propertyfinder_pulse_mapping 
      where 
            propertyfinder_community=$1 
      order by 1 asc` 
  const client = new Client()
  await client.connect()
  const values = await client.query(query,[community])
  await client.end()
  return values.rows;
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

export async function saveConfigValue(current_key:string, type:'text'|'number', value:string){
  const client = new Client()
 await client.connect()
  if (type==='number'){
      await client.query(`update configuration set int_value=$1 where key=$2`,[value, current_key.trim()])
  }else if(type ==='text') {
      await client.query(`update configuration set str_value=$1 where key=$2`,[value, current_key.trim()])
  }else{
    throw "not valid type";
  }
  await client.end()
}

export async function getStringConfigurationItem(key:string){
  const client = new Client()
  await client.connect()
  const values = await client.query(`select  int_value, str_value, description, label, min, max from configuration where key=$1`,[key.trim()])
  await client.end()
  return values.rows[0] 
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
` 
const PROPERTY_SUMMARY_FROM=` from propertyfinder p join report_propertyfinder r on r.propertyfinder_id = p.id `
const PROPERTY_SUMMARY_WHERE=`where score < 0  and user_discarded=false`
const PROPERTY_SUMMARY_ORDER_BY=` order by score asc `

export async function relevantByCommunity( community: string){
  const client = new Client()
  await client.connect()
  const relevant = await client.query(`select count(distinct p.id) as count 
                                      ${PROPERTY_SUMMARY_FROM} 
                                      ${PROPERTY_SUMMARY_WHERE} and p.community = $1`, [community])
  const favorites= await client.query(`select count(distinct p.id) as count 
                                      ${PROPERTY_SUMMARY_FROM} 
                                      ${PROPERTY_SUMMARY_WHERE} and p.favorite = true  and p.community = $1`, [community])  
  await client.end()
  return  [ favorites.rows[0].count , relevant.rows[0].count]
}


export async function getPropertySummaryData(community: string, bedrooms: string ){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      ${PROPERTY_SUMMARY_SELECT}
      ${PROPERTY_SUMMARY_FROM}
      and  p.community= $1 
      and bedrooms = $2 
      ${PROPERTY_SUMMARY_WHERE} ${PROPERTY_SUMMARY_ORDER_BY}`, 
    [community, bedrooms])
    console.log (`getPropertySummarydata found ${values.rowCount} properties`)
  await client.end()
  return values.rows;
}

export async function getPropertySummaryDataFavorite( ){
  const client = new Client()
  await client.connect()
  const values = await client.query(`
      ${PROPERTY_SUMMARY_SELECT}
      ${PROPERTY_SUMMARY_FROM}
      and p.favorite = true
     ${PROPERTY_SUMMARY_WHERE}  ${PROPERTY_SUMMARY_ORDER_BY}`)
    console.log (`Favorites found ${values.rowCount} properties`)
  await client.end()
  return values.rows;
}
