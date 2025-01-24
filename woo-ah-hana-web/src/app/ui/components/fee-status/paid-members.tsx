import { MemberFeeStatus } from "@/app/business/community/community.service";
import Image from "next/image"
import ProfileImage from '@/app/assets/img/profile.jpg'

interface MemberListProps{
  members:MemberFeeStatus[]
}

export function PaidMemberList({members}:MemberListProps){
  return(
    <div className='flex flex-col justify-center items-start'>
    <div className='text-[18px] mb-4'>모임 멤버</div>
    {members.map((member, index) => (
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
          <div>{member.memberName}</div>
        </div>
        <div><span className='text-[19px]'>{member.amount}</span> 원</div>
      </div>
    ))}
  </div>
  )
}