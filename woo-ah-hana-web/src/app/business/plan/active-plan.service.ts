import { APIResponseType, instance } from "@/app/utils/http";
import { ActivePlan } from "./active-plan";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";

export async function getActivePlans(planId: string) :Promise<APIResponseType<ActivePlan[]>>{
  const response = await instance.get(`${API_PATH}/activePlan/${planId}`);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try{
    const activePlans: ActivePlan[] = response.data;

    return {
      isSuccess: true,
      isFailure: false,
      data: activePlans
    }
  }catch(error){
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}