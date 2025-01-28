'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../molecule/dialog/dialog';
import AchromaticButton from '../../atom/button/achromatic-button';
import Dropdown from '../../atom/drop-down/drop-down';
import TextInput from '../../atom/text-input/text-input';
import { useState } from 'react';

export default function FeeSettingModal(){
  const [isOpen, setIsOpen] = useState(false); 
  const dates = Array.from({ length: 30 }, (_, i) => (i + 1).toString()+' 일');

  const handleSelect = (date: string) => {
    console.log('Selected option:', date);
  };

  const handleButton = () =>{
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <AchromaticButton>회비 설정하기</AchromaticButton>
      </DialogTrigger>
      <DialogContent className='flex flex-col max-w-80'>
        <p className='text-lg font-semibold'>얼마씩 모을까요?</p>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-start items-center gap-2'>
            <div>매월</div>
            <Dropdown options={dates} deafault='1 일' onSelect={handleSelect} />
          </div>
          <div className='flex justify-start items-center gap-2'>
            <TextInput className='max-w-40' />
            <div>원씩 모으기</div>
          </div>
        </div>
        <AchromaticButton className='mt-10' onClick={handleButton}>설정 완료</AchromaticButton>
      </DialogContent>
    </Dialog>
  );
}