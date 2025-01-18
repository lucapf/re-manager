export const MAX_COMMUNITY_LENGTH=50

export function checkMandatoryValueString (value:string | null | 'undefined', maxLength: number, name: string):{message:string, status: number, statusText:string}{
 if (value ==null) {
    return {message: `${name} is mandatory`, status: 403, statusText:"missing mandatory"}
  }
  if (value.length > maxLength){
    return {message: `${value} value too long`, status: 403, statusText:"too long"}
  }
  return {status: 200, message: "ok", statusText: "ok"}

}
  
