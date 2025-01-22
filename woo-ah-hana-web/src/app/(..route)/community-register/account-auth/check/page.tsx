'use client'

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountAuthCheck() {
    //Todo: 모임계좌 생성 API
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    communityName: '',
    feePeriod: '',
    fee: '',
    accountNumber: '',
    validationCode: '',
  });

  useEffect(() => {
    const params = {
      communityName: searchParams.get('communityName') || '',
      feePeriod: searchParams.get('feePeriod') || '',
      fee: searchParams.get('fee') || '',
      accountNumber: searchParams.get('accountNumber') || '',
      validationCode: '',
    };
    setFormData(params);
  }, [searchParams]);

  const handleInputChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      validationCode: value
    }));
  }

  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register/form' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[20px]'>
          <div className='leading-8'>
            하나은행 모임계좌에
            <span className='font-semibold'> 1원</span>을 보냈어요
          </div>
          <div className='font-semibold'>
            입금내역을 확인하고 <br /> &apos;우아하나&apos; 뒤 3자리를
            입력하세요
          </div>
          <TextInput
            variant={'secondary'}
            sizeVariants={'default'}
            placeholder='3자리 숫자'
            onValueChange={handleInputChange}
          />
        </div>
        <Link href={'/community-register/complete'}>
          <AchromaticButton className='h-12 text-xl w-full'>
            인증 확인
          </AchromaticButton>
        </Link>
      </div>
    </div>
  );
}
