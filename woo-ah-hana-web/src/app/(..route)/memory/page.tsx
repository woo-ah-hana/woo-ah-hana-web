import { MemoryListItem } from "@/app/ui/components/memory/memory-list-item";
import { getCompletedPlans } from "@/app/business/memory/memory.service";
import Header from "@/app/ui/components/header";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const communityId =
    (searchParams.id as string) || "a61f6270-974b-44f3-b9f3-7a8ab9b145ff";

  const getPlansResponse = await getCompletedPlans(communityId);
  const plans = getPlansResponse.data;
  console.log(plans);

  const PlansView: React.ReactNode[] | undefined = plans?.map((item, index) => {
    return (
      <main key={index}>
        <MemoryListItem
          planId={item.getId()}
          title={item.getTitle()}
          category={item.getCategory()}
          startDate={item.getStartDate()}
          endDate={item.getEndDate()}
          locations={item.getLocations()}
          memberNames={item.getMemberNames()}
          communityId={item.getCommunityId()}
        />
      </main>
    );
  });

  return (
    <main>
      <div className="h-full flex flex-col">
        <Header title="지난 모임 추억" link="/home" />
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-rows-1 gap-3">
            {plans ? PlansView : <div>데이터가 존재하지 않습니다.</div>}
          </div>
        </div>
      </div>
    </main>
  );
}
