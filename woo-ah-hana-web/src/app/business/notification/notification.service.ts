'use server'
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";

export async function notifyToUnpaidMember(memberId: string):Promise<APIResponseType<string>>{
  const response = await instance.post(`${API_PATH}/community-notification/unpaid`, memberId);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try{
    const result: string = response.data;

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
      data: undefined,
    };
  }
}