import Image from 'next/image';
import ProfileImage from '../../assets/img/profile.jpg';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import { getCommunityFeeStatus, MemberFeeStatus } from '@/app/business/community/community.service';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const response = await getCommunityFeeStatus(searchParams.community as string)
  const communityFeeStatus = response.data;
  const paidMembers = communityFeeStatus?.paidMembers as MemberFeeStatus[];
  const unpaidMembers = communityFeeStatus?.unpaidMembers as MemberFeeStatus[];
  const totalMembers = paidMembers.concat(unpaidMembers);

  return (
    <div className='p-5 flex flex-col gap-8'>
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
      <hr></hr>
      <div className='flex flex-col justify-center items-start'>
        <div className='text-[18px] mb-4'>모임 멤버</div>
        {totalMembers.map((member, index) => (
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
    </div>
  );
}
