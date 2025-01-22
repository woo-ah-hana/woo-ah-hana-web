"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import TextInput from "@/app/ui/atom/text-input/text-input";
import { useState } from "react";
import dayjs from "dayjs";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";
import Link from "next/link";

const PlanPage = () => {
  const { plan, updatePlan } = usePlanContext();

  const [title, setTitle] = useState(plan.title);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleUpdate = () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      title,
      plan.startDate,
      plan.endDate,
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
        <div className="mb-6">
          <TitleDisplay mainTitle="일정 제목을" subTitle="입력해주세요." />
          <TextInput
            value={title}
            onValueChange={handleTitleChange}
            placeholder="모임 제목을 입력해주세요."
            className="mb-4"
          />
        </div>
      </div>
      <Link href="/plan/set/period">
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
