export function convertDate(date: string): string{
  return `${date.substring(0,4)}년${date.substring(5,7)}월${date.substring(8,10)}일`
}

export function convertTommdd(date:string) : string{
  return `${date.substring(5, 7)}-${date.substring(8, 10)}`;
}