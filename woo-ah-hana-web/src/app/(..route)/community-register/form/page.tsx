'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import Dropdown from '@/app/ui/atom/drop-down/drop-down';
import TextInput from '@/app/ui/atom/text-input/text-input';
import AccountAuthModal from '@/app/ui/components/account/account-auth.modal';
import Header from '@/app/ui/components/header';
import Link from 'next/link';

export default function CommunityRegisterForm() {
  const dates = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

  const handleSelect = (date: string) => {
    console.log('Selected option:', date);
  };

  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register' />
      <div className='h-full flex flex-col justify-between p-10'>
        <div className=' flex flex-col text-lg gap-14'>
          <div className='flex flex-col gap-3'>
            <div>
              <span className='font-semibold'>모임 이름</span>을 입력해주세요
            </div>
            <TextInput placeholder='ex) OO고 동창회' />
          </div>
          <div className='flex flex-col'>
            <p className='text-lg font-semibold'>얼마씩 모을까요?</p>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-start items-center gap-2'>
                <div>매월</div>
                <Dropdown options={dates} onSelect={handleSelect} />
              </div>
              <div className='flex justify-start items-center gap-2'>
                <TextInput className='max-w-40' />
                <div>원씩 모으기</div>
              </div>
            </div>
          </div>
          {/* <div className='flex flex-col gap-3'>
          <div>
            하나은행 모임 <br />
            <span className='font-semibold'>계좌번호</span>를 입력해주세요
          </div>
          <TextInput placeholder='ex) 01-9876-1234-5678' />
          <AccountAuthModal />
        </div> */}
        </div>
        <div className='w-full'>
          <Link href={'/community-register/form/account'}>
            <AchromaticButton className='h-12 text-xl w-full'>
              다음
            </AchromaticButton>
          </Link>
        </div>
      </div>
    </div>
  );
}
