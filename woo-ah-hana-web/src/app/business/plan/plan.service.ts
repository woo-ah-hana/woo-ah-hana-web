"use server";

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { Plan } from "./plan";
import { InternetServerError } from "@/app/utils/http/http-error";
import { FormState } from "@/app/ui/molecule/form/form-root";

interface GetPlanListDto {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  locations: string[];
  memberIds: string[];
  memberNames: string[];
}

export async function getPlan(planId: string): Promise<APIResponseType<Plan>> {
  console.log(`${API_PATH}/plan/${planId}`);
  const response = await instance.get(`${API_PATH}/plan/${planId}`);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  try {
    const data: Plan = Plan.create(
      response.data.id,
      response.data.communityId,
      response.data.title,
      response.data.startDate,
      response.data.endDate,
      response.data.category,
      response.data.locations,
      response.data.memberIds,
      response.data.memberNames
    );

    return {
      isSuccess: true,
      isFailure: false,
      data: data,
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

export async function getPlans(
  communityId: string
): Promise<APIResponseType<Plan[]>> {
  const response = await instance.get(`${API_PATH}/plan/list/${communityId}`);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try {
    const data: GetPlanListDto[] = response.data;
    const result: Plan[] = [];

    for (const item of data) {
      result.push(
        Plan.create(
          item.id,
          communityId,
          item.title,
          item.startDate,
          item.endDate,
          item.category,
          item.locations,
          item.memberIds,
          item.memberNames
        )
      );
    }

    return {
      isSuccess: true,
      isFailure: false,
      data: result,
    };
  } catch (error) {
    console.log(error);
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
    });
  }
}

export async function deletePlan(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id");
  const response = await instance.delete(`${API_PATH}/plan/${id}`);
  if (response.status === 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }
  return {
    isSuccess: true,
    isFailure: false,
    validationError: {},
    message: "삭제 성공",
  };
}
