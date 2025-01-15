'use client';

import Image from 'next/image';
import ProfileImage from '../../assets/img/profile.jpg';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';

//임시 멤버 데이터
const members = [
  { name: '김하나', fee: '0' },
  { name: '홍창기', fee: '50000' },
  { name: '문보경', fee: '100000' },
  { name: '박해민', fee: '100000' },
  { name: '김현수', fee: '100000' },
];

const unpaidMembers = members.filter(member => parseInt(member.fee) < 100000);

export default function FeeStatus() {
    const handleRequestButton = () => {
        console.log('회비 요청하기');
    }
    
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
                alt={`${member.name} 프로필`}
                className='w-12 h-12 rounded-full object-cover'
              />
              <div className='text-gray-800'>{member.name}</div>
            </div>
            <AchromaticButton onClick={handleRequestButton}>회비 요청</AchromaticButton>
          </div>
        ))}
      </div>
      <hr></hr>
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
                alt={`${member.name} 프로필`}
                className='w-12 h-12 rounded-full object-cover'
              />
              <div>{member.name}</div>
            </div>
            <div><span className='text-[19px]'>{member.fee}</span> 원</div>
          </div>
        ))}
      </div>
    </div>
  );
}
