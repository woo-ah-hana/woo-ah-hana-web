"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import { useState } from "react";
import dayjs from "dayjs";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import Link from "next/link";
import { CategoryMenu } from "@/app/ui/components/plan/set-category-menu";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";
import Header from "@/app/ui/components/header";

const categories = [
  { key: "meeting", label: "정기 모임" },
  { key: "location", label: "여행" },
  { key: "meal", label: "식사" },
  { key: "hobby", label: "취미" },
  { key: "shopping", label: "쇼핑" },
  { key: "acc", label: "기타" },
];

export default function SetCategory() {
  const { plan, updatePlan } = usePlanContext();

  const [title] = useState(plan.title);
  const [dates] = useState<[Date | null, Date | null]>([
    plan.startDate ? dayjs(plan.startDate).toDate() : null,
    plan.endDate ? dayjs(plan.endDate).toDate() : null,
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    plan.category || null
  );

  const handleUpdate = () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      title,
      dates[0]?.toISOString() || plan.startDate,
      dates[1]?.toISOString() || plan.endDate,
      selectedCategory || "",
      plan.locations,
      plan.memberIds,
      plan.getMemberNames()
    );

    updatePlan(updatedPlan);
  };

  return (
    <div>
      <Header
        title="모임 일정 생성"
        link={`/plan?id=${plan.getCommunityId()}`}
      />
      <div className="flex flex-col p-6">
        <div className="flex flex-col gap-20 min-h-[calc(100vh-10rem)]">
          <div className="mb-6 gap-4">
            <TitleDisplay mainTitle="일정의 목적을" subTitle="선택해주세요." />
            <CategoryMenu
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
          </div>
        </div>
        <Link href="/plan/set/locations">
          <AchromaticButton
            onClick={handleUpdate}
            className="w-full h-12 flex justify-center items-center"
            disabled={!selectedCategory}
          >
            다음
          </AchromaticButton>
        </Link>
      </div>
    </div>
  );
}
