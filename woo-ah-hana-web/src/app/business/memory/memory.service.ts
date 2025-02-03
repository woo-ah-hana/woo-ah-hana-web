"use server";

import { APIResponseType, instance } from "@/app/utils/http";
import { Plan } from "@/app/business/plan/plan";
import { InternetServerError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";
import { Memory } from "@/app/business/memory/memory";
import { FormState } from "@/app/ui/molecule/form/form-root";
import {
  GetPlanReceiptDto,
  PaymentLog,
  PaymentLogType,
  PlanReceipt,
} from "@/app/business/memory/receipt";

interface GetCompletedPlanListDto {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  locations: string[];
  memberIds: string[];
  memberNames: string[];
}

interface GetPostsByPlanIdDto {
  id: string;
  memberName: string;
  imageUrl: string;
  description: string;
  createdAt: string;
}

export async function getPostsByPlanId(
  planId: string
): Promise<APIResponseType<Memory[]>> {
  const response = await instance.get(`${API_PATH}/post/completed/${planId}`);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try {
    const data: GetPostsByPlanIdDto[] = response.data;
    const result: Memory[] = data.map((item) =>
      Memory.create(
        item.id,
        item.memberName,
        item.imageUrl,
        item.description,
        item.createdAt
      )
    );

    return {
      isSuccess: true,
      isFailure: false,
      data: result,
    };
  } catch (error) {
    console.error(error);
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
    });
  }
}

export async function getCompletedPlans(
  communityId: string
): Promise<APIResponseType<Plan[]>> {
  const response = await instance.get(
    `${API_PATH}/plan/completed/${communityId}`
  );

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try {
    const data: GetCompletedPlanListDto[] = response.data;
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

export async function getPlanReceipt(
  planId: string
): Promise<APIResponseType<PlanReceipt>> {
  const response = await instance.get(`${API_PATH}/plan/receipt/${planId}`);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try {
    const data: GetPlanReceiptDto = response.data;
    const logs = data.records.map(
      (log: PaymentLogType) =>
        new PaymentLog(
          log.tranDate,
          log.tranTime,
          log.inoutType,
          log.tranType,
          log.printContent,
          log.tranAmt,
          log.afterBalanceAmt,
          log.branchMame
        )
    );

    const result = new PlanReceipt(logs, data.totalAmt, data.perAmt);
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

export async function deletePost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const id = formData.get("id");
  const response = await instance.delete(`${API_PATH}/post/${id}`);
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

export async function createPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  console.log(formData);
  const id = formData.get("id")?.toString();
  const content = formData.get("content")?.toString();
  const image = formData.get("image") as File;

  if (!id || !content || !image) {
    return {
      isSuccess: false,
      isFailure: true,
      validationError: { id: ["필수 값이 누락되었습니다."] },
      message: "입력값을 확인해주세요.",
    };
  }

  const requestData = {
    planId: id,
    description: content,
  };

  const multipartFormData = new FormData();
  multipartFormData.append(
    "data",
    new Blob([JSON.stringify(requestData)], { type: "application/json" })
  );
  multipartFormData.append("image", image);

  console.log(multipartFormData);

  try {
    const response = await instance.post(
      `${API_PATH}/post/create`,
      multipartFormData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        transformRequest: [
          function () {
            return multipartFormData;
          },
        ],
      }
    );

    if (response.status >= 200 && response.status < 300) {
      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: "게시물이 성공적으로 생성되었습니다.",
      };
    } else {
      throw new Error("Unexpected server response");
    }
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "게시물 생성 중 오류가 발생했습니다.",
    };
  }
}
