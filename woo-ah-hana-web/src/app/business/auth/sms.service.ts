'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export async function sendSMSCode(phoneNumber: string):Promise<APIResponseType<boolean>> {
  try{
    const response = await instance.post(`${API_PATH}/sms/send-code?phoneNumber=${phoneNumber}`)
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

export async function validSMSCode(phoneNumber: string, validationCode:string):Promise<APIResponseType<boolean>> {
  try{
    const response = await instance.post(`${API_PATH}/sms/valid-code`, {phoneNumber, validationCode})
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