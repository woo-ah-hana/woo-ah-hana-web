'use server'

import { FormState } from "@/app/ui/molecule/form/form-root";
import { instance } from "@/app/utils/http";
import { API_PATH } from "@/app/utils/http/api-query";

// TODO: 업데이트 API 수정 요청해야함.
export async function updatePlanDate(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const startDate = formData.get('start-date');
  const endDate = formData.get('end-date');
  const id = formData.get('id');

  try {
    const getPlanResponse = await instance.get(`${API_PATH}/plan/${id}`)
    const plan = getPlanResponse.data;
    console.log(plan);
    const response = await instance.patch(`${API_PATH}/plan/update/${id}`, {
      id: plan.id, 
      communityId: plan.communityId, 
      title: plan.title, 
      startDate: `${startDate} 11:11:11`, 
      endDate: `${endDate} 11:11:11`, 
      category: plan.category, 
      locations: plan.locations, 
      memberIds: plan.memberIds
    });
  
    console.log(response);
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "날짜를 수정했습니다.",
    };
  } catch (error) {
    console.log(error);
    return {
      isSuccess: false,
      isFailure: true,
      validationError: {},
      message: "날짜 수정에 실패했습니다.",
    };
  }
}
