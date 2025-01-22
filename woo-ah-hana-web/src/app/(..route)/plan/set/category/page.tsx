"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import { useState } from "react";
import dayjs from "dayjs";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import TitleDisplay from "@/app/ui/molecule/plan-set/title-display";
import { Card, CardHeader, CardTitle } from "@/app/ui/molecule/card/card";
import {
  categoryColors,
  categoryIcons,
  categoryTextColors,
} from "@/app/ui/atom/category/category";

const categories = [
  { key: "meeting", label: "정기 모임" },
  { key: "location", label: "여행" },
  { key: "exercise", label: "운동" },
  { key: "hobby", label: "취미" },
  { key: "shopping", label: "쇼핑" },
  { key: "acc", label: "기타" },
];

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
          <TitleDisplay mainTitle="일정의 목적을" subTitle="선택해주세요." />
          <div className="grid grid-cols-3 gap-4">
            {categories.map((category) => (
              <Card
                key={category.key}
                className={`${
                  categoryColors[category.key]
                } relative pb-[100%] overflow-hidden rounded-lg`}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3">
                  <img
                    src={categoryIcons[category.key]}
                    alt={category.label}
                    className="mb-[10%] w-[70%] h-[70%]" /* 이미지 하단 여백을 비율 기반으로 설정 */
                  />
                  <CardTitle className="">
                    <div
                      className={`text-center ${
                        categoryTextColors[category.key]
                      } font-bold text-[calc(10px+2vw)]`}
                    >
                      {category.label}
                    </div>
                  </CardTitle>
                </div>
              </Card>
            ))}
          </div>
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
