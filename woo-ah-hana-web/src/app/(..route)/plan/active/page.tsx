import { ActivePlan } from "@/app/business/plan/active-plan"
import { getActivePlans } from "@/app/business/plan/active-plan.service";
import { ActivePlanDetail } from "@/app/ui/components/active-plan/active-plan-detail"
import Map from "@/app/ui/components/map/map"

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id;
  const date = searchParams.date;
  const getActivePlansResponse = await getActivePlans(planId as string);
  const activePlans = getActivePlansResponse.data?.filter((item)=>{return item.date===date}) as ActivePlan[];
  
  const ActivePlans = activePlans.map((item, index)=>{
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

  return(
    <main>
      <div className="p-5 grid grid-cols-1 gap-3">
        {/* TODO: 지도 로딩 중일 경우, 렌딩 페이지 작업 */}
        <Map loc={activePlans.map((item)=>{return item.address})}/>
        {ActivePlans}
      </div>
    </main>
  )
}