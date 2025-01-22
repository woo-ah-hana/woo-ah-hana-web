import { PlanDetail } from "@/app/ui/components/plan/plan-detail";
import { getPlan } from "@/app/business/plan/plan.service";
import { Plan } from "@/app/business/plan/plan";
import Link from "next/link";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { getActivePlans } from "@/app/business/plan/active-plan.service";
import { ActivePlan } from "@/app/business/plan/active-plan";
import { Card } from "@/app/ui/molecule/card/card";
import { getCommunityMembers, Member } from "@/app/business/community/community.service";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id as string;
  const communityId = searchParams.community as string;

  const getPlanResponse = await getPlan(planId)
  const getActivePlansResponse = await getActivePlans(planId);

  const plan = getPlanResponse.isSuccess?
    (getPlanResponse.data as Plan):
    (Plan.create("","","","","","",[],[],[]) as Plan)
  
  const getCommunityMembersResponse = await getCommunityMembers(communityId)
  const communityMembers = getCommunityMembersResponse.data as Member[];

  const activePlans: ActivePlan[] = getActivePlansResponse.isSuccess?
    (getActivePlansResponse.data as ActivePlan[]):([]);
  
  const checkDuplicate:string[] = [];
  const filtered = activePlans.map((item)=>{
    if(!checkDuplicate.includes(item.date)){
      checkDuplicate.push(item.date)
      return item
    }
  }).filter((item)=>{return item})

  const ActivePlanScheduleCard: JSX.Element[] = filtered.map((item, index)=>{
    return (
      <main key={index}>
        <Link href={`/plan/active?id=${planId}&date=${item?.date}`}>
          <Card className="p-5 text-center">
            <div>{item?.date.substring(5)}</div>
          </Card>
        </Link>
      </main>
    )
  })
  
  
  return (
    <main>
      <div className="flex flex-col gap-3 p-5">
        <PlanDetail 
        id={planId} 
        communityId={plan.getCategory()}
        title={plan.getTitle()} 
        category={plan.getTitle()} 
        startDate={plan.getStartDate()} 
        endDate={plan.getEndDate()} 
        memberIds={plan.getMemberIds()} 
        memberNames={plan.getMemberNames()}
        communityMemberIds={communityMembers.map((member)=>{return member.id})}
        communityMemberNames={communityMembers.map((member)=>{return member.name})}
        locations={plan.getLocations()}
        />
        <div className="grid grid-cols-3 gap-2">
          {ActivePlanScheduleCard}
        </div>
        
        <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
          <Link href={`/ai?plan=${planId}`}>
            <AchromaticButton className="rounded-full">
              AI 여행 계획짜기
            </AchromaticButton>
          </Link>
        </div>
      </div>
    </main>
  )
}