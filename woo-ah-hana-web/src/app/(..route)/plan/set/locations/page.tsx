"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import { HiLightBulb } from "react-icons/hi";
import { FiMinus } from "react-icons/fi";
import TextInput from "@/app/ui/atom/text-input/text-input";
import { useState } from "react";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import Link from "next/link";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";

export default function SetLocation() {
  const { plan, updatePlan } = usePlanContext();

  const [locations, setLocations] = useState<string[]>(
    plan.locations.length > 0 ? plan.locations : [""]
  );

  const handleLocationChange = (index: number, value: string) => {
    setLocations((prevLocations) =>
      prevLocations.map((location, i) => (i === index ? value : location))
    );
  };

  const handleAddLocation = () => {
    if (locations.length < 3) {
      setLocations((prevLocations) => [...prevLocations, ""]);
    }
  };

  const handleRemoveLocation = (index: number) => {
    setLocations((prevLocations) =>
      prevLocations.filter((_, i) => i !== index)
    );
  };

  const handleUpdate = () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      plan.title,
      plan.startDate,
      plan.endDate,
      plan.category,
      locations.filter((location) => location.trim() !== ""), // 빈 값 제거
      plan.memberIds,
      plan.getMemberNames()
    );

    updatePlan(updatedPlan);

    console.log(plan);
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-20 min-h-[calc(100vh-10rem)]">
        <div className="mb-6 gap-4">
          <TitleDisplay
            mainTitle="만나고 싶은 지역, 장소를"
            subTitle="입력해주세요."
          />
          <p className="text-gray-400 flex items-center gap-2">
            <HiLightBulb />
            최소 1개 이상 입력해야 하며, 최대 3개까지 가능합니다.
          </p>

          {/* 장소 입력 필드 */}
          <div className="flex flex-col gap-4 mb-6">
            {locations.map((location, index) => (
              <div key={index} className="flex items-center gap-4">
                <TextInput
                  value={location}
                  onValueChange={(value) => handleLocationChange(index, value)}
                  placeholder={`장소 ${index + 1}`}
                  className="flex-1"
                />
                {locations.length > 1 && (
                  <button
                    onClick={() => handleRemoveLocation(index)}
                    className="text-white bg-gray-400 rounded-full p-2 shadow-md"
                    title="삭제"
                  >
                    <FiMinus />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* 추가 버튼 */}
          {locations.length < 3 && (
            <AchromaticButton onClick={handleAddLocation} className="mb-6">
              장소 추가
            </AchromaticButton>
          )}
        </div>
      </div>

      {/* 다음 버튼 */}
      <Link
        href={{
          pathname: "/plan/set/members",
          query: { id: plan.getCommunityId() }, // communityId는 해당 아이디 값
        }}
      >
        <AchromaticButton
          onClick={handleUpdate}
          className="w-full h-12 flex justify-center items-center"
        >
          다음
        </AchromaticButton>
      </Link>
    </div>
  );
}
