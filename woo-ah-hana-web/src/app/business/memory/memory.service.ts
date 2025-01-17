"use server";

import { APIResponseType, instance } from "@/app/utils/http";
import { Plan } from "@/app/business/plan/plan";
import { InternetServerError } from "@/app/utils/http/http-error";
import { API_PATH } from "@/app/utils/http/api-query";
import { Memory } from "@/app/business/memory/memory";
import { FormState } from "@/app/ui/molecule/form/form-root";
import { GetPlanReceiptDto, PaymentLog, PlanReceipt } from "@/app/business/memory/receipt";

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

export async function getPlanReceipt(planId: string):Promise<APIResponseType<PlanReceipt>> {

    const response = await instance.get(`${API_PATH}/plan/receipt/${planId}`);

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
        const data: GetPlanReceiptDto = response.data;

        const logs = data.records.map((log: any) => new PaymentLog(
            log.tran_date,
            log.tran_time,
            log.inout_type,
            log.tran_type,
            log.print_content,
            log.tran_amt,
            log.after_balance_amt,
            log.branch_name
        ));

        const result = new PlanReceipt(
            logs,  
            data.totalAmt,
            data.perAmt
        );
        
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

