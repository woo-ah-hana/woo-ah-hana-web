"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import { HiLightBulb } from "react-icons/hi";
import TextInput from "@/app/ui/atom/text-input/text-input";
import { useState } from "react";
import dayjs from "dayjs";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import TitleDisplay from "@/app/ui/molecule/plan-set/title-display";

const PlanPage = () => {
  const { plan, updatePlan } = usePlanContext();

  const [title, setTitle] = useState(plan.title);
  const [dates, setDates] = useState<[Date | null, Date | null]>([
    plan.startDate ? dayjs(plan.startDate).toDate() : null,
    plan.endDate ? dayjs(plan.endDate).toDate() : null,
  ]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

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
      title,
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
        <div className="mb-6 gap-4">
          <TitleDisplay
            mainTitle="만나고 싶은 지역, 장소를"
            subTitle="입력해주세요."
          />{" "}
          <p className="text-gray-400 flex">
            <HiLightBulb />
            최소 1개이상 입력 해야합니다
          </p>
          <TextInput
            value={title}
            onValueChange={handleTitleChange}
            placeholder="ex) 서울 명동 카페"
            className="mb-10"
          />
          <TextInput
            value={title}
            onValueChange={handleTitleChange}
            placeholder="ex) 대구 관광지"
            className="mb-10"
          />
          <TextInput
            value={title}
            onValueChange={handleTitleChange}
            placeholder="ex) 강원도 등산코스"
            className="mb-10"
          />
        </div>
      </div>
      <AchromaticButton
        onClick={handleUpdate}
        className="w-full h-12 flex justify-center items-center"
      >
        다음
      </AchromaticButton>
    </div>
  );
};

export default PlanPage;
