import { PlanListItem } from "@/app/ui/components/plan/plan-list-item";
import IconMemory from '@/app/assets/img/icon-closing.png'
import { getPlans } from "@/app/business/plan/plan.service";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const getPlansResponse = await getPlans(searchParams.id as string)
  const plans = getPlansResponse.data;

  // TODO: Icon은 랜덤 ?
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
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-rows-1 gap-3">
            {plans ? PlansView : <div>데이터가 존재하지 않습니다.</div>}
          </div>
        </div>
        <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
          <Link href={"plan/set"}>
            <AchromaticButton className="h-14 w-14 rounded-full">
              <IoAdd color="white" size={40} />
            </AchromaticButton>
          </Link>
        </div>
      </div>
    </main>
  )
}