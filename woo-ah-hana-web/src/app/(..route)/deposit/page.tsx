'use client';

import { useRouter } from 'next/navigation';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import { Card } from '@/app/ui/molecule/card/card';
import { useEffect, useState } from 'react';
import useCommunityStore from '@/app/store/community-store';
import Header from '@/app/ui/components/header';
import {
  depositInfo,
  DepositInfoResponseDTO,
} from '@/app/business/account/account.service';

export default function Deposit() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const community = useCommunityStore((state) => state.community);
  const [depositInfoData, setDepositInfoData] =
    useState<DepositInfoResponseDTO | null>(null);

  useEffect(() => {
    const fetchDepositInfo = async () => {
      try {
        const response = await depositInfo({ communityId: community });
        if (response.isSuccess && response.data) {
          setDepositInfoData(response.data);
        } else {
          console.error('모임 정보를 가져오는 데 실패했습니다.');
        }
      } catch (error) {
        console.error('API 호출 오류:', error);
      }
    };

    fetchDepositInfo();
  }, []);

  const handleNavigation = () => {
    if (amount) {
      const communityAccountNumber = depositInfoData?.communityAccountNumber || ''; 
      const communityAccountBank = depositInfoData?.communityAccountBank || '';

      const queryParams = new URLSearchParams({
        communityId: community,
        communityAccountNumber,
        communityAccountBank,
        amount,
      }).toString();

      router.push(`/deposit/check?${queryParams}`);
    } else {
      alert('금액을 입력해주세요.');
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
  };

  return (
    <div className='h-full flex flex-col'>
      <Header title='입금' link='/home' />
      <div className='px-10 py-5 h-full flex flex-col justify-between'>
        <div className='flex flex-col gap-10'>
          <div className='border-none shadow-none'>
            <h1 className='text-2xl'>
              내 통장<span className='text-lg'>에서</span>
            </h1>
            <p className='text-base'>
              잔액 {depositInfoData?.memberAccountBalance}원
            </p>
          </div>
          <div className='border-none shadow-none'>
            <h1 className='text-2xl'>
              {depositInfoData?.communityAccountBank} 통장
              <span className='text-lg'>으로</span>
            </h1>
            <p className='text-base'>
              계좌번호 {depositInfoData?.communityAccountNumber}
            </p>
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
    </div>
  );
}
