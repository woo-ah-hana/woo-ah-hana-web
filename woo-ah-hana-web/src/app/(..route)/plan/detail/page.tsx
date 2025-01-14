import { PlanDetail } from "@/app/ui/components/plan/plan-detail";
import { getPlan } from "@/app/business/plan/plan.service";
import { Plan } from "@/app/business/plan/plan";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id as string;
  const response = await getPlan(planId)

  const plan = response.isSuccess?
    (response.data as Plan):
    (Plan.create("","","","","","",[],[]) as Plan)
  
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
      </div>
    </main>
  )
}