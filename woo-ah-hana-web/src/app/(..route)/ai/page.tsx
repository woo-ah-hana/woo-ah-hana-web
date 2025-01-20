import { getPlan } from "@/app/business/plan/plan.service";
import { RequestActivePlanForm } from "@/app/ui/components/active-plan/requset-active-plan-form";
import { Card } from "@/app/ui/molecule/card/card";

export default async function Home({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }){
  const response = await getPlan(searchParams.plan as string);
  const plan = response.data;
  console.log(plan);
  return (
  <main>
    <div className="flex flex-col gap-3 p-5">
      
      <Card className="flex flex-col gap-2 p-5 text-center">
        <div> 여행 계획 짜주는 AI입니다. </div>
        <div> 음성 또는 키보드로 요청사항을 입력하세요. </div>
        <div> AI 요청은 하루에 세번까지만 가능합니다. </div>
      </Card>
      <RequestActivePlanForm 
        startDate={plan?.getStartDate() as string} 
        endDate={plan?.getEndDate() as string}
        locations={plan?.getLocations() as string[]}
      />
    </div>
  </main>
  )
}
