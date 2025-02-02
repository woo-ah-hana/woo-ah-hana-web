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

export interface GetMyAccountInfoResponseDto{
  bankTranId: string
  accountNumber: string
  name: string
  amount: number
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
  communityAccountName : string;
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

    return {
      isSuccess: true,
      isFailure: false,
    };
  } catch (error) {
    console.error(error);
    return {
      isSuccess: false,
      isFailure: true,
    };
  }
}

export async function setAutoDeposit(communityId: string, fee: string, depositDay: number) :Promise<APIResponseType<string>>{
  try{
    const response = await instance.post(`${API_PATH}/community/account/autoDeposit`, {communityId, fee, depositDay});
    const data:string = response.data
    return {
      isSuccess: false,
      isFailure: true,
      data: data
    }
  }catch(error){
    console.log(error);
    return{
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
  
}

export async function sendCode(bankTranId: string, accountNumber: string) :Promise<APIResponseType<string>>{
  try{
    const response = await instance.post(`${API_PATH}/community/send-code`, {bankTranId, accountNumber});
    const data:string = response.data
    return {
      isSuccess: false,
      isFailure: true,
      data: data
    }
  }catch(error){
    console.log(error);
    return{
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
  
}

export async function changeAccount(accountNumber: string, bankTranId: string, validationCode:string) :Promise<APIResponseType<string>>{
  try{
    const response = await instance.post(`${API_PATH}/community/account/changeAccount`, {accountNumber, bankTranId, validationCode});
    const data:string = response.data
    return {
      isSuccess: false,
      isFailure: true,
      data: data
    }
  }catch(error){
    console.log(error);
    return{
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
  
}

export async function getMyAccount():Promise<APIResponseType<GetMyAccountInfoResponseDto>> {
  try{
    const response = await instance.get(`${API_PATH}/member/my-account/info`)
    if (response.status === 500) {
      throw new InternetServerError({
        message: "서버가 불안정합니다. 잠시 후 다시 시도해주세요.",
        statusCode: response.status,
        response: response.data,
      });
    }

    const data:GetMyAccountInfoResponseDto = response.data

    return{
      isSuccess: true,
      isFailure: false,
      data: data
    }
  }catch(error){
    console.log(error);
    return{
      isSuccess: false,
      isFailure: true,
      data: undefined
    }
  }
}