import {APIResponseType, instance} from "@/app/utils/http";
import {Plan} from "@/app/business/plan/plan";
import {InternetServerError} from "@/app/utils/http/http-error";
import {API_PATH} from "@/app/utils/http/api-query";

interface GetCompletedPlanListDto{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    category: string;
    locations: string[];
}

export async function getCompletedPlans(communityId: string):Promise<APIResponseType<Plan[]>> {

    const response = await instance.get(`${API_PATH}/plan/completed/${communityId}`);

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
        const data: GetCompletedPlanListDto[] = response.data;
        const result: Plan[] = [];

        for(const item of data){
            result.push(Plan.create(
                item.id,
                communityId,
                item.title,
                item.startDate,
                item.endDate,
                item.category,
                item.locations,
                [])
            )
        }

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