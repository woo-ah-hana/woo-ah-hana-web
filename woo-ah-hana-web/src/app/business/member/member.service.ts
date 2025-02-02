'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { Member } from "../community/community.service";

export async function inquiryMember(phoneNumber: string) :Promise<APIResponseType<Member>>{
  try{
    const response = await instance.get(`${API_PATH}/member/inquiry?id=${phoneNumber}`);
    const data:Member = response.data
    return {
      isSuccess: false,
      isFailure: true,
      data: data
    }
  }catch(error){
    console.log(error);
    return{
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
}