'use client';

import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import checkLottie from '../../../assets/lottie/check.json';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';
const Lottie = dynamic(() => import('react-lottie-player'), { ssr: false });

export default function CommunityRegisterComplete() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = '/home';
    }, 2800); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='h-full p-10 flex flex-col justify-between'>
      <div className='mt-10 text-2xl align-center justify-center text-center flex flex-col gap-4'>
        <h1>모임 계좌 연동이</h1>
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
      <Link href={'/home'}>
        <AchromaticButton
          className='w-full px-5 h-14 text-xl'
        >
          확인
        </AchromaticButton>
      </Link>
    </div>
  );
}
