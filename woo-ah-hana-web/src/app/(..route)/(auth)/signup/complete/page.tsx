'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import checkLottie from '@/app/assets/lottie/check.json';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect,useState } from 'react';
import { useSearchParams } from 'next/navigation';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function CommunityRegisterComplete() {

  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
      accountNumber: '',
      bankName: '',
      bankTranId: '',
    });

  useEffect(() => {
      const params = {
        bankName: searchParams.get('bankName') || '',
        bankTranId: searchParams.get('bankTranId') || '',
        accountNumber: searchParams.get('accountNumber') || '',
      };
      setFormData(params);
    }, [searchParams]);

  const queryParams = new URLSearchParams({
    bankName: formData.bankName,
    bankTranId: formData.bankTranId,
    accountNumber: formData.accountNumber,
  }).toString();

  return (
    <div className='h-full p-10 flex flex-col justify-between'>
      <div className='mt-10 text-2xl align-center justify-center text-center flex flex-col gap-4'>
        <h1>개인 계좌 확인이</h1>
        <h1>완료되었습니다</h1>
        <div className='flex justify-center mt-4'>
          <Lottie
            loop={false}
            play
            animationData={checkLottie}
            style={{ width: '150px', height: '150px' }}
          ></Lottie>
        </div>
      </div>

        
      <Link href={`/signup?${queryParams}`}>
        <AchromaticButton
          className='w-full px-5 h-14 text-xl'
        >
          확인
        </AchromaticButton>
      </Link>
    </div>
  );
}
