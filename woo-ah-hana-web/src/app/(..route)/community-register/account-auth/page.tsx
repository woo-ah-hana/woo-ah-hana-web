'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountRegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  //Todo: 계좌로 1원 보내기 API

  const [formData, setFormData] = useState({
    communityName: '',
    feePeriod: '',
    fee: '',
    accountNumber: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const params = {
      communityName: searchParams.get('communityName') || '',
      feePeriod: searchParams.get('feePeriod') || '',
      fee: searchParams.get('fee') || '',
      accountNumber: '',
    };
    setFormData(params);
  }, [searchParams]);

  useEffect(() => {
    setIsFormValid(!!formData.accountNumber); 
  }, [formData.accountNumber]);

  const handleInputChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      accountNumber: value,
    }));
  };

  const handleSubmit = () => {
    const queryParams = new URLSearchParams({
      communityName: formData.communityName,
      feePeriod: formData.feePeriod,
      fee: formData.fee,
      accountNumber: formData.accountNumber,
    }).toString();

    router.push(`/community-register/account-auth/check?${queryParams}`);
  };

  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register/form' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[22px]'>
          <div className='leading-8'>
            하나은행
            <br />
            <span className='font-semibold'>모임 계좌번호</span>를 입력해주세요
          </div>
          <TextInput
            variant={'secondary'}
            sizeVariants={'lg'}
            type={'number'}
            placeholder='&#39; - &#39; 없이 입력하세요'
            onValueChange={handleInputChange}
          />
        </div>
        <AchromaticButton
          variant={'outline'}
          className='h-12 text-xl w-full'
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          계좌 인증하기
        </AchromaticButton>
      </div>
    </div>
  );
}
