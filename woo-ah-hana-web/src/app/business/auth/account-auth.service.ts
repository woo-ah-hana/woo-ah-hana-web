'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export async function validateAccountCode(accountNumber: string, validationCode:string):Promise<APIResponseType<boolean>> {
  try{
    const response = await instance.post(`${API_PATH}/account/validate`, {accountNumber, validationCode})
    const result: boolean = response.data;
    return {
      isSuccess: true,
      isFailure: false,
      data: result
    }
  }catch(error){
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: false
    }
  }
}