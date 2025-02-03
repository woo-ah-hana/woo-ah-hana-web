'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../molecule/dialog/dialog';
import AchromaticButton from '../../atom/button/achromatic-button';
import TextInput from '../../atom/text-input/text-input';
import { useState } from 'react';

export default function AccountAuthModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleButton = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AchromaticButton variant={'outline'}>계좌 인증하기</AchromaticButton>
      </DialogTrigger>
      <DialogContent className='flex flex-col max-w-80'>
        <div className='flex flex-col gap-1'>
          <div className='text-lg font-semibold'>
            우아하나가 아래계좌로 1원을 보냈어요
          </div>
          <div className='flex gap-3'>
            <div>하나은행</div>
            <div>12-0123-45679817</div>
          </div>
        </div>

        <div className='flex flex-col gap-3 mt-10'>
            <div className='text-lg font-semibold'>입금내역을 확인하고 <br/> &apos;우아하나&apos; 뒤 3자리를 입력하세요</div>
            <TextInput placeholder='3자리 숫자' />
        </div>
        
        <AchromaticButton className='mt-10' onClick={handleButton}>
          인증하기
        </AchromaticButton>
      </DialogContent>
    </Dialog>
  );
}
