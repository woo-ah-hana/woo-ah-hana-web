'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";

export interface TransferResponseDTO{
    isSuccess : boolean;
    message : string;
    data : number;
}

export interface TransferRequestDTO{
  accountNumber : string;
  bankTranId : string;
  printContent : string;
  inoutType : string;
  tranAmt : string;
}

export async function transfer(requestBody: TransferRequestDTO): Promise<APIResponseType<TransferResponseDTO>> {
  try {
    const response = await instance.post(`${API_PATH}/account/transfer`, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }

    const data: TransferResponseDTO = response.data;

    return {
      isSuccess: true,
      isFailure: false,
      data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      data: undefined,
    };
  }
}