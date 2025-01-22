'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import checkLottie from '../../../assets/lottie/check.json';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function DepositComplete() {
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');
  
  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className='mt-10 text-2xl align-center justify-center text-center flex flex-col gap-4'>
        <h1>토스 뱅크 통장으로</h1>
        <h1>
          <span className='text-3xl'>{amount}</span> 원을
        </h1>
        <h1>옮겼습니다</h1>

        <div className='flex justify-center mt-4'>
          <Lottie
            loop={false}
            play
            animationData={checkLottie}
            style={{ width: '150px', height: '150px' }}
          ></Lottie>
        </div>
      </div>
      <AchromaticButton className='w-full px-5 h-14 text-xl'>
        확인
      </AchromaticButton>
    </div>
  );
}
