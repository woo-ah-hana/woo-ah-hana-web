'use client'
import Image from "next/image"
import ProfileImage from '@/app/assets/img/profile.jpg'
import { MemberFeeStatus } from "@/app/business/community/community.service";
import AchromaticButton from "../../atom/button/achromatic-button";

interface UnpaidMemberListProps{
  unpaidMembers:MemberFeeStatus[]
}

export function UnpaidMemberList({unpaidMembers}:UnpaidMemberListProps){
  
  return (
    <div className='flex flex-col justify-center items-start'>
      <div className='text-[18px] mb-4'>안 낸 멤버</div>
    {unpaidMembers.map((member, index) => (
      <div
        key={index}
        className='flex items-center justify-between gap-6 p-2 w-full'
      >
        <div className='flex justify-center items-center gap-8'>
          <Image
            src={ProfileImage}
            alt={`${member.memberName} 프로필`}
            className='w-12 h-12 rounded-full object-cover'
          />
          <div className='text-gray-800'>{member.memberName}</div>
        </div>
        <AchromaticButton>회비 요청</AchromaticButton>
      </div>
    ))}
  </div>
  )
}