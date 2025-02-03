'use server'

import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

export interface InquiryAccountTransferLogResponseDto {
    is_success: boolean;
    message: string;
    data: {
      api_tran_id: string;
      res_code: string;
      res_message: string;
      api_tran_dtm: string;
      bank_tran_id: string;
      bank_tran_date: string;
      bank_code_tran: string;
      bank_rsp_code: string;
      bank_rsp_message: string;
      fintech_use_num: string;
      balance_amt: string;
      page_record_cnt: string;
      next_page_yn: string;
      before_inquiry_trace_info: string;
      res_list: {
        tran_date: string;
        tran_time: string;
        inout_type: string;
        tran_type: string;
        print_content: string;
        tran_amt: string;
        after_balance_amt: string;
        branch_name: string;
      }[];
    };
  }
  

export async function inquiryAccountTransferLog(bank_tran_id: string, account_number: string, from_date: string, to_date: string) :Promise<APIResponseType<InquiryAccountTransferLogResponseDto>>{
  try{
    const response = await instance.post(`${API_PATH}/account/record`, {bank_tran_id, account_number, from_date, to_date});
    const data:InquiryAccountTransferLogResponseDto = response.data
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