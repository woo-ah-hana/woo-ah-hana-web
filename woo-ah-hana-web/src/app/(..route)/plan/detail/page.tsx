import { PlanDetail } from "@/app/ui/components/plan/plan-detail";
import IconMemory from '@/app/assets/img/icon-closing.png'

export default async function Home({searchParams}:{searchParams: { [key: string]: string | string[] | undefined }}){
  const planId = searchParams.id as string;
  
  return (
    <main>
      <div className="p-5">
        <PlanDetail id={planId} icons={IconMemory.src} title={"등산일정"} category={"등산"} startDate={""} endDate={""} memberIds={[]} locations={["강남맛집"]}/>
      </div>
    </main>
  )
}