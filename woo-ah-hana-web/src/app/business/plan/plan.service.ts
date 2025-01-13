'use server'

import { APIResponseType, instance } from "@/app/utils/http"
import { API_PATH } from "@/app/utils/http/api-query"
import { Plan } from "./plan"
import { InternetServerError } from "@/app/utils/http/http-error"

interface GetPlanListDto{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    category: string;
    locations: string[];
}

export async function getPlans(communityId: string):Promise<APIResponseType<Plan[]>> {
  const response = await instance.get(`${API_PATH}/plan/list/${communityId}`);

  if(response.status==500){
    throw new InternetServerError(
      {
        message: '서버가 불안정합니다. 잠시후 시도해주세요.',
        statusCode: response.status,
        response: response.data
      }
    )
  }

  try{
    const data: GetPlanListDto[] = response.data;
    const result: Plan[] = [];
    
    for(const item of data){
      result.push(Plan.create(
        item.id,
        communityId,
        item.title,
        item.startDate,
        item.endDate,
        item.category,
        item.locations,
        [])
      )
    }
    
    return{
      isSuccess: true,
      isFailure: false,
      data: result
    }
  }catch(error){
    console.log(error);
    throw new InternetServerError(
      {
        message: '서버가 불안정합니다. 잠시후 시도해주세요.',
        statusCode: response.status,
      }
    )
  }
}