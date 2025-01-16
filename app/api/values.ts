export const MAX_COMMUNITY_LENGTH=50

export function checkMandatoryValueString (value?:string, maxLength: number, name){
 if (value ==null) {
    return new Response(new Blob([`${name} is mandatory`]), {status: 403, statusText:"missing mandatory"})
  }
  if (value.length > maxLength){
    return new Response(new Blob([`${value} value too long`]), {status: 403, statusText:"too long"})
  }

}
  
