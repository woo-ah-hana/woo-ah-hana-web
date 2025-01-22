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

export interface TransferRecordRequestDTO {
  communityId : string;
  recentMonth : number;
}

export interface TransferRecordResponseDTO {
  tranDate : string;
  tranTime : string;
  inoutType : string;
  tranType : string;
  printContent : string;
  tranAmt : string;
  afterBalanceAmt : string;
  branchName : string;
}

export async function getTransferRecords(requestBody : TransferRecordRequestDTO): Promise<APIResponseType<TransferRecordResponseDTO[]>> {
  try {
    const response = await instance.post(`${API_PATH}/community/trsfRecords`, requestBody, {
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

    const data: TransferRecordResponseDTO[] = response.data;

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

export interface DepositInfoResponseDTO{
  bankTranId : string;
  memberAccountNumber : string;
  memberAccountBalance : number;
  communityAccountBank : string;
  communityAccountNumber : string;
}

export interface DepositInfoRequestDTO{
  communityId : string;
}

export async function depositInfo(requestBody: DepositInfoRequestDTO): Promise<APIResponseType<DepositInfoResponseDTO>> {
  try {
    const response = await instance.post(`${API_PATH}/community/deposit/info`, requestBody, {
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
    
    const data: DepositInfoResponseDTO = response.data;

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

export interface DepositRequestDTO{
  communityId : string;
  amount : string;
}

export async function deposit(requestBody: DepositRequestDTO): Promise<APIResponseType<string>> {
  try {
    const response = await instance.post(`${API_PATH}/community/deposit`, requestBody, {
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
    
    // const data: DepositCommunityInfoRespDTO = response.data;

    return {
      isSuccess: true,
      isFailure: false,
      // data: data,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
      // data: undefined,
    };
  }
}