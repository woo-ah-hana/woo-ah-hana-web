"use client";

import { useState } from "react";
import Image from "next/image";
import ProfileImage from "@/app/assets/img/profile.jpg";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";
import Link from "next/link";

const members = [
  { id: 1, name: "김미강" },
  { id: 2, name: "최선정" },
  { id: 3, name: "김채운" },
  { id: 4, name: "이준혁" },
  { id: 5, name: "박지은" },
  { id: 6, name: "손민수" },
  { id: 7, name: "유현수" },
  { id: 8, name: "정다은" },
  { id: 9, name: "최지우" },
  { id: 10, name: "황도윤" },
  { id: 11, name: "강민지" },
  { id: 12, name: "서윤아" },
];

export default function MemberSelection() {
  const { plan, updatePlan } = usePlanContext();

  const [selectedMembers, setSelectedMembers] = useState<number[]>(
    plan.memberIds ? plan.memberIds.map(Number) : []
  );

  const toggleMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleUpdate = () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      plan.title,
      plan.startDate,
      plan.endDate,
      plan.category,
      plan.locations,
      selectedMembers.map(String),
      plan.getMemberNames()
    );

    updatePlan(updatedPlan);
  };

  return (
    <div className="flex flex-col p-6 min-h-screen">
      <div className="flex flex-col gap-6 flex-grow">
        <div className="mb-6 gap-4">
          <TitleDisplay
            mainTitle="해당 일정에 참여할 인원을"
            subTitle="선택해주세요."
          />
          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-4">
              {selectedMembers.map((id) => {
                const member = members.find((m) => m.id === id);
                return (
                  <div
                    key={id}
                    className="flex items-center bg-wooahBlue text-sm px-2 py-1 rounded-full"
                  >
                    {member?.name}
                    <button
                      className="ml-2 text-gray-500"
                      onClick={() => toggleMember(id)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
              <hr className="w-full mt-4 text-gray-400" />
            </div>
          )}
          <div className="flex-1 overflow-y-auto max-h-[60vh]">
            <div className="flex flex-col gap-2">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between gap-4 p-2"
                >
                  <div className="flex justify-center items-center gap-8">
                    <Image
                      src={ProfileImage}
                      alt={`${member.name} 프로필`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-gray-800">{member.name}</div>
                  </div>
                  <div>
                    {selectedMembers.includes(member.id) ? (
                      <IoIosCheckmarkCircle
                        onClick={() => toggleMember(member.id)}
                        className="text-wooahMain text-3xl cursor-pointer"
                      />
                    ) : (
                      <IoIosCheckmarkCircleOutline
                        onClick={() => toggleMember(member.id)}
                        className="text-gray-400 text-3xl cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Link href="/plan">
        <div>
          <AchromaticButton
            onClick={handleUpdate}
            className="w-full h-12 flex justify-center items-center"
          >
            다음
          </AchromaticButton>
        </div>
      </Link>
    </div>
  );
}
