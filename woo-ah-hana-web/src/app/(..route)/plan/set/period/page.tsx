"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import { Calendar } from "@/app/ui/molecule/calendar/calendar";
import { useState } from "react";
import dayjs from "dayjs";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";
import Link from "next/link";

const PlanPage = () => {
  const { plan, updatePlan } = usePlanContext();
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    plan.startDate ? dayjs(plan.startDate).toDate() : null,
    plan.endDate ? dayjs(plan.endDate).toDate() : null,
  ]);

  const handleDateChange = (newDates: [Date | null, Date | null]) => {
    setDates([
      newDates[0] ? dayjs(newDates[0]).toDate() : null,
      newDates[1] ? dayjs(newDates[1]).toDate() : null,
    ]);
  };

  const handleUpdate = () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      plan.title,
      dates[0]?.toISOString() || plan.startDate,
      dates[1]?.toISOString() || plan.endDate,
      plan.category,
      plan.locations,
      plan.memberIds,
      plan.getMemberNames()
    );

    updatePlan(updatedPlan);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-20 min-h-[calc(100vh-10rem)]">
        <div>
          <TitleDisplay mainTitle="일정 기간을" subTitle="설정 해주세요" />
          <Calendar
            value={dates}
            onChange={handleDateChange}
            className="mb-4"
          />
        </div>
      </div>
      <Link href="/plan/set/locations">
        <AchromaticButton
          onClick={handleUpdate}
          className="w-full h-12 flex justify-center items-center"
        >
          다음
        </AchromaticButton>
      </Link>
    </div>
  );
};

export default PlanPage;
