'use server'

import { FormState } from "@/app/ui/molecule/form/form-root";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";

export async function updateLocations(id: string, locations: string[]):Promise<APIResponseType<string>>{
  const response = await instance.patch(`${API_PATH}/plan/update/${id}`, {locations})
  
  if (response.status === 500) {
    throw new InternetServerError({
      message: '서버가 불안정합니다. 잠시후 시도해주세요.',
      statusCode: response.status,
      response: response.data
    });
  }

  try{
    return{
      isSuccess: true,
      isFailure: false,
      data: response.data as string
    }
  }catch(error){
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
}

export async function updateMembers(id: string, memberIds: string[]):Promise<APIResponseType<string>>{
  const response = await instance.patch(`${API_PATH}/plan/update/${id}`, {memberIds})
  
  if (response.status === 500) {
    throw new InternetServerError({
      message: '서버가 불안정합니다. 잠시후 시도해주세요.',
      statusCode: response.status,
      response: response.data
    });
  }

  try{
    return{
      isSuccess: true,
      isFailure: false,
      data: response.data as string
    }
  }catch(error){
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
}

export async function updatePlanDate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const startDate = formData.get('start-date');
  const endDate = formData.get('end-date');
  const id = formData.get('id');

  try {

    const response = await instance.patch(`${API_PATH}/plan/update/${id}`, {
      startDate: `${startDate} 11:11:11`, 
      endDate: `${endDate} 11:11:11`, 
    });
  
    console.log(response);
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "날짜를 수정했습니다.",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "날짜 수정에 실패했습니다.",
    };
  }
}
