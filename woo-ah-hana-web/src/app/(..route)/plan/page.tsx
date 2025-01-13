import { PlanListItem } from "@/app/ui/components/plan/plan-list-item";
import IconMemory from '@/app/assets/img/icon-closing.png'
import { getPlans } from "@/app/business/plan/plan.service";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const getPlansResponse = await getPlans(searchParams.id as string)
  const plans = getPlansResponse.data;
  console.log(plans);

  const PlansView: React.ReactNode[] | undefined = plans?.map((item, index)=>{
    return (
      <main key={index}>
        <PlanListItem 
          planId={item.getId()}
          icons={IconMemory.src}
          title={item.getTitle()}
          category={item.getCategory()}
          startDate={item.getStartDate()}
          endDate={item.getEndDate()}
          locations={item.getLocations()}/>
      </main>
    )
  })

  return(
    <main>
      <div>
        <div className="p-5 grid grid-rows-1 gap-3">
          {plans?PlansView:<div>데이터가 존재하지 않습니다.</div>}
        </div>
      </div>
    </main>
  )
}