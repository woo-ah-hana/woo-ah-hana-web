import { MemoryListItem } from "@/app/ui/components/memory/memory-list-item";
import { getCompletedPlans } from "@/app/business/memory/memory.service";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { IoAdd } from "react-icons/io5";
import Link from "next/link";
import MemoryReceiptModal from "@/app/ui/components/memory/memory-receipt.modal";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const communityId =
    (searchParams.id as string) || "6f5d21e2-25c4-4fda-a0d9-b07dfc281f68";
  console.log(communityId);
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
        />
      </main>
    );
  });
  
  return (
    <main>
      <div className="h-full flex flex-col">
        <div className="flex-1 overflow-y-auto p-5">
          <MemoryReceiptModal planId='b34d0cc1-46fd-4bb7-a192-cf5fda1fc92f' />
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
  );
}
