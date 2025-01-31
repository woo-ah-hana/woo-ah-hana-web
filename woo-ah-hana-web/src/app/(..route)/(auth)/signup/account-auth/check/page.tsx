'use client';

import { validateCode } from '@/app/business/community/community.service';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {message} from "antd";

export default function AccountAuthCheck() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    accountNumber: '',
    bankName: '',
    bankTranId: '',
    validationCode: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const params = {
      bankName: searchParams.get('bankName') || '',
      bankTranId: searchParams.get('bankTranId') || '',
      accountNumber: searchParams.get('accountNumber') || '',
      validationCode: '',
    };
    setFormData(params);
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

  const handleSubmit = async () => {
    const requestBody = {
      accountNumber: formData.accountNumber,
      validationCode: '우아하나' + formData.validationCode,
    };

    //모임 계좌 추가 API 
    const response = await validateCode(requestBody);
    if (response.isSuccess) {
      const queryParams = new URLSearchParams({
        bankName: formData.bankName,
        bankTranId: formData.bankTranId,
        accountNumber: formData.accountNumber,
      }).toString();

      router.push(`/signup/complete?${queryParams}`);
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
        content: '입력 코드가 일치하지 않습니다. 다시 시도해주세요.',
        duration: 3,
        className: 'font-bold'
      });
    }
  };

  return (
    <>
      {contextHolder}
    <div className='h-full flex flex-col'>
      <Header title='개인 계좌 인증하기' link='/signup/account-auth' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[20px]'>
          <div className='leading-8'>
            <span className='font-semibold'>{formData.bankName} </span> 계좌(<span className='font-semibold'>{formData.accountNumber}</span>)에
            <br />
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
