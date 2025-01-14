'use server'

import { FormState } from "@/app/ui/molecule/form/form-root";

export async function updatePlanDate(prevState: FormState, formData: FormData):Promise<FormState>{
  try{
    console.log(formData);
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "날짜 수정에 실패했습니다."
    }

  }catch(error){
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "날짜 수정에 실패했습니다."
    }
  }
}