'use client'
import { ActivePlan, SearchResult } from "@/app/business/plan/active-plan";
import Form from "../../molecule/form/form-index";
import { FormState } from "../../molecule/form/form-root";
import { ActivePlanDetail } from "./active-plan-detail";
import AchromaticButton from "../../atom/button/achromatic-button";
import { useState } from "react";
import { search } from "@/app/business/search/search.service";
import { loadActivePlan } from "@/app/business/ai/ai.service";

export function RequestActivePlanForm(){
  const [aiData, setAiDate] = useState<ActivePlan[]>([]);

  async function mock(prevState: FormState, formData: FormData):Promise<FormState>{
    const input = formData.get('request') as string
    const activePlanSource = await search([input]);

    const activePlan = await loadActivePlan(
      activePlanSource.data as SearchResult[], 
      '2025년5월1일', 
      '2025년5월2일'
    )


    setAiDate(activePlan);
    return{
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "AI 요청에 실패했습니다. 잠시후 시도해주세요."
    }
  }

  const ActivePlans = aiData.map((item, index)=>{
    return(
      <main key={index}>
        <ActivePlanDetail 
          date={item.date} 
          schedule={item.schedule} 
          time={item.time} 
          description={item.description} 
          address={item.address} 
          link={item.link} 
          mapx={item.mapx} 
          mapy={item.mapy}/>
      </main>
    )
  })

  return (
    <main className="flex flex-col gap-3">
      {aiData.length==0
        ?<></>
        :
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 p-3 bg-slate-100 rounded-xl overflow-y-auto h-96">
            {ActivePlans}
          </div>
          <div className="flex flex-row gap-2">
            <AchromaticButton className='w-full' variant={`outline`}>저장하기</AchromaticButton>
          </div>
        </div> 
      }
      
      <div>
        <Form id={"request-for-ai"} action={mock} onSuccess={()=>{}} failMessageControl={"alert"}>
            <div className="grid grid-cols-[7fr_3fr]">
            <Form.TextInput 
            id={`request`} 
            label=""
            placeholder="예시) 강남역 맛집 추천해줘."
            />
            <Form.SubmitButton className="h-11" label="요청하기"/>
            </div>
        </Form>
      </div>  
    </main>
  )
}