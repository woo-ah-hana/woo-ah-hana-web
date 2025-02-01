"use server";
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";

interface CreatePlanRequestDto {
  communityId: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  locations: string[];
  memberIds: string[];
}

export async function CreatePlan(
  plan: CreatePlanRequestDto
): Promise<APIResponseType<string>> {
  try {
    const response = await instance.post(`${API_PATH}/plan/create`, plan);

    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시후 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }

    const planId = response.data as string;
    return {
      isSuccess: true,
      isFailure: false,
      data: planId,
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}
