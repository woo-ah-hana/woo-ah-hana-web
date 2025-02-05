'use client';

import { useState } from 'react';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import {
  IoIosCheckmarkCircleOutline,
  IoIosCheckmarkCircle,
} from 'react-icons/io';
import { Plan } from '@/app/business/plan/plan';
import { usePlanContext } from '@/app/context/plan-context';
import SelectedMembersDisplay from '@/app/ui/components/plan/set-selected-member';
import MemberItem from '@/app/ui/components/plan/set-member-item';
import TitleDisplay from '@/app/ui/components/plan/set-title-display';
import { CreatePlan } from '@/app/business/plan/plan-create.servcie';
import { GetMembersDto } from '@/app/business/community/community.service'; // Ensure you have the correct import for GetMembersDto
import Header from '../header';

export default function SetMembers({ members }: { members: GetMembersDto[] }) {
  const { plan, updatePlan } = usePlanContext();
  const [selectedMembers, setSelectedMembers] = useState<string[]>(
    plan.memberIds ? plan.memberIds.map(String) : []
  );

  const toggleMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(members.map((member) => member.id));
    }
  };

  const save = async () => {
    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      plan.title,
      plan.startDate,
      plan.endDate,
      plan.category,
      plan.locations,
      selectedMembers,
      []
    );
    updatePlan(updatedPlan);

    const updatedPlanObject = updatedPlan.toJSON();
    await CreatePlan(updatedPlanObject);
    window.location.href = `/plan?id=${plan.getCommunityId()}`;
  };

  return (
    <div className='w-full'>
      <Header
        title='모임 일정 생성'
        link={`/plan?id=${plan.getCommunityId()}`}
      />
      <div className='flex flex-col px-6'>
        <div className='flex flex-col gap-20 min-h-[calc(100vh-10rem)]'>
          <div className='mb-6 gap-4'>
            <TitleDisplay
              mainTitle='해당 일정에 참여할 인원을'
              subTitle='선택해 주세요.'
            />

            {selectedMembers.length > 0 && (
              <SelectedMembersDisplay
                selectedMembers={selectedMembers}
                members={members}
                toggleMember={toggleMember}
              />
            )}

            <div className='flex items-center justify-between mb-4'>
              <span className='text-gray-800'>멤버 목록</span>
              <div
                className='flex items-center cursor-pointer'
                onClick={toggleSelectAll}
              >
                <span className='text-gray-800 mr-2'>전체 선택</span>
                {selectedMembers.length === members.length ? (
                  <IoIosCheckmarkCircle className='text-wooahMain text-3xl mr-2' />
                ) : (
                  <IoIosCheckmarkCircleOutline className='text-gray-400 text-3xl mr-2' />
                )}
              </div>
            </div>

            <div className='flex-1 overflow-y-auto max-h-[55vh]'>
              <div className='flex flex-col gap-2'>
                {members.map((member, index) => (
                  <MemberItem
                    key={index}
                    id={member.id}
                    name={member.name}
                    isSelected={selectedMembers.includes(member.id)}
                    toggleMember={toggleMember}
                  />
                ))}
              </div>
            </div>
          </div>

          <AchromaticButton
            onClick={save}
            className='w-full h-12 flex justify-center items-center'
          >
            다음
          </AchromaticButton>
        </div>
      </div>
    </div>
  );
}
