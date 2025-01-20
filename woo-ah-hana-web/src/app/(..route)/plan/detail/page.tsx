import { PlanDetail } from "@/app/ui/components/plan/plan-detail";
import { getPlan } from "@/app/business/plan/plan.service";
import { Plan } from "@/app/business/plan/plan";
import Link from "next/link";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id as string;
  const response = await getPlan(planId)
  
  const plan = response.isSuccess?
    (response.data as Plan):
    (Plan.create("","","","","","",[],[],[]) as Plan)
  
  return (
    <main>
      <div className="p-5">
        <PlanDetail 
        id={planId} 
        title={plan.getTitle()} 
        category={plan.getTitle()} 
        startDate={plan.getStartDate()} 
        endDate={plan.getEndDate()} 
        memberIds={plan.getMemberIds()} 
        locations={plan.getLocations()}
        />
        <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
          <Link href={"ai"}>
            <AchromaticButton className="rounded-full">
              AI 여행 계획짜기
            </AchromaticButton>
          </Link>
        </div>
      </div>
    </main>
  )
}