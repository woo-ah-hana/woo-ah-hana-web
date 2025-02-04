'use client';

import { createCommunity } from '@/app/business/community/community.service';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {message} from "antd";
import Image from 'next/image';
import IconTimer from '../../../../assets/img/icon-timer-red.svg';

export default function AccountAuthCheck() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    communityName: '',
    feePeriod: '',
    fee: '',
    accountNumber: '',
    validationCode: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const params = {
      communityName: searchParams.get('communityName') || '',
      feePeriod: searchParams.get('feePeriod') || '',
      fee: searchParams.get('fee') || '',
      accountNumber: searchParams.get('accountNumber') || '',
      validationCode: '',
    };
    setFormData(params);
    setCountdown(300); // 5분(300초) 타이머 시작
  }, [searchParams]);

  useEffect(() => {
    const isValidCode = /^\d{3}$/.test(formData.validationCode);
    setIsFormValid(isValidCode);
  }, [formData.validationCode]);

  const handleInputChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      validationCode: value,
    }));
  };

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSubmit = async () => {
    const requestBody = {
      name: formData.communityName,
      accountNumber: formData.accountNumber,
      validationCode: '우아하나' + formData.validationCode,
      credits: 3,
      fee: Number(formData.fee),
      feePeriod: Number(formData.feePeriod),
    };

    //모임 계좌 추가 API 
    const response = await createCommunity(requestBody);

    if (response.isSuccess) {
      router.push('/community-register/complete');
    }
    else if(response.data == '입금자명이 일치하지 않습니다.') {
      messageApi.open({type: 'error',
        content: '입력 코드가 일치하지 않습니다.',
        duration: 3,
        className: 'font-bold'
      });
    }
    else {
      messageApi.open({type: 'error',
        content: '모임 계좌 생성에 실패했습니다. 다시 시도해주세요.',
        duration: 3,
        className: 'font-bold'
      });
    }
  };

  return (
    <>
      {contextHolder}
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
          <div className='flex flex-col gap-1'>
          <TextInput
            variant={'secondary'}
            sizeVariants={'default'}
            placeholder='3자리 숫자'
            onValueChange={handleInputChange}
          />
          <div className='self-end'>
                {countdown !== null && countdown >= 0 && (
                  <div className='flex flex-row justify-center items-center gap-0 text-[17px] text-start text-[#ec4646] mt-1 mr-1'>
                    {`${Math.floor(countdown / 60)}:${String(
                      countdown % 60
                    ).padStart(2, '0')}`}
                    <Image
                      src={IconTimer}
                      alt='timer'
                      style={{ width: '19px' }}
                    />
                  </div>
                )}
              </div>
          </div>
          
        </div>
        <AchromaticButton
          className='h-12 text-xl w-full'
          disabled={!isFormValid}
          onClick={handleSubmit}
        >
          인증 확인
        </AchromaticButton>
      </div>
    </div>
    </>
    );
}
