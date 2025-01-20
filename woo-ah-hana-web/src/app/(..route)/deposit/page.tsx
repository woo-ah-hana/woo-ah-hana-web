'use client';

import { useRouter } from 'next/navigation';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import { Card } from '@/app/ui/molecule/card/card';
import { useState } from 'react';
import { TransferRequestDTO } from '@/app/business/account/account.service';
import { FormNumberInput } from '@/app/ui/molecule/form/form-number-input';

export default function Deposit() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const myBalance = 1000; //임시 - 유저 계좌 잔액
  const accountNumber = '3561057204496'; //임시 - 모임통장 계좌번호
  const bankTranId = '002'; //임시 - 은행 이체 id

  const handleNavigation = () => {
    if (amount) {
      const queryParams = new URLSearchParams({
        myBalance: myBalance.toString(),
        accountNumber,
        bankTranId,
        amount,
      }).toString();
  
      router.push(`/deposit/check?${queryParams}`);
      console.log('전송하는 값:', { myBalance, accountNumber, bankTranId, amount });
    } else {
      alert('금액을 입력해주세요.');
    }
  };
  

  const handleAmountChange = (value : string) =>{
    setAmount(value);
  }

  return (
    <div className='p-10 h-screen flex flex-col justify-between'>
      <div className='flex flex-col gap-10'>
        <div className='border-none shadow-none mt-10'>
          <h1 className='text-2xl'>
            하나은행 통장<span className='text-lg'>에서</span>
          </h1>
          <p className='text-base'>잔액 {myBalance}원</p>
        </div>
        <div className='border-none shadow-none'>
          <h1 className='text-2xl'>
            토스뱅크 통장<span className='text-lg'>으로</span>
          </h1>
          <p className='text-base'>계좌번호 {accountNumber}</p>
        </div>
        <Card className='border-none shadow-none'>
          <TextInput
            placeholder='얼마나 옮길까요?'
            className='border-none w-full'
            type={'number'}
            onValueChange={handleAmountChange}
          ></TextInput>
        </Card>
      </div>
      <div>
        <AchromaticButton
          className='w-full px-5 h-14 text-xl'
          onClick={handleNavigation}
        >
          확인
        </AchromaticButton>
      </div>
    </div>
  );
}
