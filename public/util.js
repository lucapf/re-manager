export function toHumanValue(value){
var suffix =""

if (value /1000000 > 1){
   suffix ="M"
  value = value / 1000000
}

if (value /1000 > 1){
   suffix ="K"
  value = value / 1000
}
var digits = 2
if (value >= 10){
  digits = 1
}

if (value >= 100){
  digits = 0
}

return new Intl.NumberFormat('default', {
          style: 'decimal',
          minimumFractionDigits: digits,
          maximumFractionDigits: digits,
        }).format(value) + suffix
}




export function formatInteger(value){

return new Intl.NumberFormat('default', {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
}

export function to_anchor(value){
  return `#${value.trim()}`
}
export function numerize_property_type(value){
  var v = value.trim()
  if ( v == "studio"){
    return 0
  }else {
    return Number(v)
  }
}
export function stringify_property_type(value){
  if (!isNaN(Number(value))){
    if (Number(value) ==1){
      return `${value} bedroom`
    }else{
    return `${value} bedrooms`
    }
  }else {
    return value
  }


}

export function formatDate(value){
  return value.toLocaleDateString('en-UK')
}

export function formatPercentageNoDigit(value) {
 return new Intl.NumberFormat('default', {
          style: 'percent',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
}

export function formatCurrency(value) {
 return new Intl.NumberFormat('default', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(value)
}
export function formatCurrencyNoDec(value) {
 return new Intl.NumberFormat('default', {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)
}
