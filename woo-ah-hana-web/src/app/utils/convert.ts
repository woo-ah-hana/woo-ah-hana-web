export function convertDate(date: string): string{
  return `${date.substring(0,4)}년${date.substring(5,7)}월${date.substring(8,10)}일`
}


export function convertTommdd(date:string) : string{
  return `${date.substring(5, 7)}-${date.substring(8, 10)}`;
}

export function convertDateWithoutYear(date: string): string{
  return `${date.substring(5,7)}월${date.substring(8,10)}일`
}

export function convertBankNameToCode(name: BankName): BankCode | undefined{
  if(bankMap.get(name) === undefined) {
    return "000"
  }else{
    return bankMap.get(name);
  }
}

export function convertCodeToBankName(code: BankCode): BankName | undefined{
  const codeMap = new Map<BankCode, BankName>();
  bankMap.forEach((code, name) => {
    codeMap.set(code, name);
  });
  return codeMap.get(code);
}

export type BankCode =  "000" | "001" | "002" | "003" | "004" | "005" | "006" | "007" | "008" | "009" | "010" | "011" | "012" | "013"
export type BankName = 
  | "하나은행"
  | "농협은행"
  | "우리은행"
  | "신한은행"
  | "기업은행"
  | "카카오뱅크"
  | "토스뱅크"
  | "KB국민은행"
  | "부산은행"
  | "대구은행"
  | "광주은행"
  | "전북은행"
  | "제주은행";

const bankMap = new Map<BankName, BankCode>();
bankMap.set("하나은행", "001");
bankMap.set("농협은행", "002");
bankMap.set("우리은행", "003");
bankMap.set("신한은행", "004");
bankMap.set("기업은행", "005");
bankMap.set("카카오뱅크", "006");
bankMap.set("토스뱅크", "007");
bankMap.set("KB국민은행", "008");
bankMap.set("부산은행", "009");
bankMap.set("대구은행", "010");
bankMap.set("광주은행", "011");
bankMap.set("전북은행", "012");
bankMap.set("제주은행", "013");

export const banks = [
  '하나은행', 
  '농협은행', 
  '우리은행', 
  '신한은행', 
  '기업은행', 
  '카카오뱅크',
  '토스뱅크', 
  'KB국민은행',
  '부산은행', 
  '대구은행', 
  '광주은행', 
  '전북은행', 
  '제주은행',
];