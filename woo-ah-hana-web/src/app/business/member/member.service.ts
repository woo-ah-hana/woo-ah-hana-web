'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { Member } from "../community/community.service";

export interface MemberInfoResponseDTO{
  id: string;
  username: string;
  name: string;
  phoneNumber: string;
}

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

export async function getMemberInfo() :Promise<APIResponseType<MemberInfoResponseDTO>>{
  try{
    const response = await instance.get(`${API_PATH}/member/info`);
    const data:MemberInfoResponseDTO = response.data
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