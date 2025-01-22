'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import Dropdown from '@/app/ui/atom/drop-down/drop-down';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CommunityRegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    communityName: '',
    feePeriod: '1',
    fee: ''
  })
  const [isFormValid, setIsFormValid] = useState(false);
  const dates = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

  const handleSelect = (date: string) => {
    setFormData(prevState => ({
      ...prevState,
      feePeriod: date
    }));
  };

  const handleNameChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      communityName: value
    }));
  }

  const handleFeeChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      fee: value
    }));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      communityName: formData.communityName,
      feePeriod: formData.feePeriod,
      fee: formData.fee
    }).toString();

    router.push(`/community-register/account-auth?${queryParams}`);
  }

  useEffect(() => {
    const { communityName, feePeriod, fee } = formData;
    setIsFormValid(!!communityName && !!feePeriod && !!fee);
  }, [formData]);

  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register' />
      <div className='h-full flex flex-col justify-between p-10'>
        <div className=' flex flex-col text-[19px] gap-20'>
          <div className='flex flex-col gap-5'>
            <div className='font-semibold'>모임 이름을 입력해주세요
            </div>
            <TextInput variant={'secondary'} placeholder='ex) OO고 동창회' onValueChange={handleNameChange} />
          </div>
          <div className='flex flex-col gap-5'>
            <p className='font-semibold'>얼마씩 모을까요?</p>
            <div className='flex flex-col gap-4'>
              <div className='flex justify-start items-center gap-2'>
                <div>매월</div>
                <Dropdown options={dates} onSelect={handleSelect} />
              </div>
              <div className='flex justify-start items-center gap-2'>
                <TextInput variant={'secondary'} type={'number'} className='max-w-40' onValueChange={handleFeeChange} />
                <div>원씩 모으기</div>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full'>
            <AchromaticButton className='h-12 text-xl w-full' onClick={handleSubmit} disabled={!isFormValid}>
              다음
            </AchromaticButton>
        </div>
      </div>
    </div>
  );
}
