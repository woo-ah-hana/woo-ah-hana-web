'use client';

import { useRouter } from 'next/navigation';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';

export default function DepositCheck() {
  const router = useRouter();

  const handleNavigation = () => {
    router.push('/deposit/complete');
  }
  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className='mt-10 text-2xl align-center justify-center text-center flex flex-col gap-4'>
        <h1>토스 뱅크 통장으로</h1>
        <h1>
          <span className='text-3xl'>10000</span> 원을
        </h1>
        <h1>옮길까요?</h1>
      </div>

      <div className='flex flex-col gap-12'>
        <div className='flex flex-col text-gray-500'>
          <div className='flex justify-between'>
            <p>출금계좌</p>
            <p className='text-black'>내 토스 뱅크 통장</p>
          </div>
          <div className='flex justify-between'>
            <p>입금계좌</p>
            <p className='text-black'>토스 21490123678</p>
          </div>
        </div>
        <div>
          <AchromaticButton className='w-full px-5 h-14 text-xl' onClick={handleNavigation}>옮기기</AchromaticButton>
        </div>
      </div>
    </div>
  );
}
