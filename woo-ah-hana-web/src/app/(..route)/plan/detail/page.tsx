import { PlanDetail } from "@/app/ui/components/plan/plan-detail";
import { getPlan } from "@/app/business/plan/plan.service";
import { Plan } from "@/app/business/plan/plan";
import Link from "next/link";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { getActivePlans } from "@/app/business/plan/active-plan.service";
import { ActivePlan } from "@/app/business/plan/active-plan";
import { Card } from "@/app/ui/molecule/card/card";
import {
  getCommunityMembers,
  Member,
} from "@/app/business/community/community.service";
import Header from "@/app/ui/components/header";
import Robot from "@/app/assets/img/icon-robot1.png";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const planId = searchParams.id as string;
  const communityId = searchParams.community as string;

  const getPlanResponse = await getPlan(planId);
  const getActivePlansResponse = await getActivePlans(planId);

  const plan = getPlanResponse.isSuccess
    ? (getPlanResponse.data as Plan)
    : (Plan.create("", "", "", "", "", "", [], [], []) as Plan);

  const getCommunityMembersResponse = await getCommunityMembers(communityId);
  const communityMembers = getCommunityMembersResponse.data as Member[];

  const activePlans: ActivePlan[] = getActivePlansResponse.isSuccess
    ? (getActivePlansResponse.data as ActivePlan[])
    : [];

  const checkDuplicate: string[] = [];
  const filtered = activePlans
    .map((item) => {
      if (!checkDuplicate.includes(item.date)) {
        checkDuplicate.push(item.date);
        return item;
      }
    })
    .filter((item) => {
      return item;
    });

  const ActivePlanScheduleCard: JSX.Element[] = filtered.map((item, index) => {
    return (
      <main key={index}>
        <Link href={`/plan/active?id=${planId}&date=${item?.date}`}>
          <Card className="p-3">
            <div className="text-center text-lg font-medium">
              {item?.date.substring(5)}
            </div>
            <div className="text-right text-slate-500 text-xs mt-2">
              {`보러가기>`}
            </div>
          </Card>
        </Link>
      </main>
    );
  });

  return (
    <main className="bg-gray-100">
      <Header title="모임 일정" link={`/plan?id=${communityId}`} />
      <div className="bg-white">
        <PlanDetail
          id={planId}
          title={plan.getTitle()}
          category={plan.getCategory()}
          startDate={plan.getStartDate()}
          endDate={plan.getEndDate()}
          memberIds={plan.getMemberIds()}
          memberNames={plan.getMemberNames()}
          communityMemberIds={communityMembers.map((member) => {
            return member.id;
          })}
          communityMemberNames={communityMembers.map((member) => {
            return member.name;
          })}
          locations={plan.getLocations()}
        />
      </div>
      <div className="bg-white mt-2">
        <div className="text-start p-5 text-lg font-bold">AI가 세운 일정</div>
        <div className="ml-5 mr-5 pb-5">
          <div className="grid grid-cols-2 gap-2">{ActivePlanScheduleCard}</div>
          <div className="fixed bottom-5 right-5 mb-5 flex justify-end items-end">
            <Link href={`/ai?plan=${planId}&community=${communityId}`}>
              <AchromaticButton className="text-black font-normal rounded-full bg-gradient-to-b from-blue-400 to-blue-200">
                <Image
                  src={Robot}
                  width={30}
                  height={30}
                  alt="Robot Icon"
                  className="animate-pulse"
                />
                AI 여행 계획짜기
              </AchromaticButton>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
