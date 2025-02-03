'use client'
import Image from "next/image"
import ProfileImage from '@/app/assets/img/profile.jpg'
import { MemberFeeStatus } from "@/app/business/community/community.service";
import AchromaticButton from "../../atom/button/achromatic-button";
import {yearMonthProps} from "@/app/(..route)/fee-status/page";
import { notifyToUnpaidMember } from "@/app/business/notification/notification.service";

interface UnpaidMemberListProps{
  unpaidMembers:MemberFeeStatus[];
  yearMonth:yearMonthProps;
}

export function UnpaidMemberList({unpaidMembers, yearMonth}:UnpaidMemberListProps){
  
  return (
      <div className='flex flex-col justify-center items-start'>
          <div className='text-[18px] mb-4 font-bold'>{yearMonth.year}년 {yearMonth.month}월 </div>
          <div className='text-[18px] mb-4'>이번 달 납입 잊지 마세요!</div>
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
                  <AchromaticButton onClick={async ()=>{
                    await notifyToUnpaidMember(member.memberId)
                  }}>
                    회비 요청
                  </AchromaticButton>
              </div>
          ))}
      </div>
  )
}