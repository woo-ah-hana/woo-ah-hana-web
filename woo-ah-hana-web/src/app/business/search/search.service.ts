'use server'
import { APIResponseType, instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";
import { InternetServerError } from "@/app/utils/http/http-error";
import { SearchResult } from "../plan/active-plan";

export async function search(words: string[]):Promise<APIResponseType<SearchResult[]>>{
  const response = await instance.post(`${API_PATH}/naver/search`, words);

  if (response.status == 500) {
    throw new InternetServerError({
      message: "서버가 불안정합니다. 잠시후 시도해주세요.",
      statusCode: response.status,
      response: response.data,
    });
  }

  try{
    const results: SearchResult[] = [];
    for(const data of response.data){
      const arr = data.items as SearchResult[];
      results.push(...arr)
    }

    return{
      isSuccess: true,
      isFailure: false,
      data: results
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