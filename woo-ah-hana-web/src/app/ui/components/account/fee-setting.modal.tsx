'use client';

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../molecule/dialog/dialog';
import AchromaticButton from '../../atom/button/achromatic-button';
import Dropdown from '../../atom/drop-down/drop-down';
import TextInput from '../../atom/text-input/text-input';
import { useRef, useState } from 'react';
import { changeFeeInfo } from '@/app/business/community/community.service';
import useCommunityStore from '@/app/store/community-store';

export default function FeeSettingModal(){
  const [isOpen, setIsOpen] = useState(false); 
  const [selectedDate, setSelectedDate] = useState<number>(1);
  const newFeeRef = useRef<HTMLInputElement>(null);
  const community = useCommunityStore((state)=>{return state.community});
  const dates = Array.from({ length: 30 }, (_, i) => (i + 1).toString()+' 일');
  

  const handleSelect = (date: string) => {
    console.log('Selected option:', date.substring(0,1));
    setSelectedDate(Number(date.substring(0,1)).valueOf());
  };

  const handleButton = async () =>{
    setIsOpen(false)
    if(community.id !=='0' ){
      const feeAmount = Number(newFeeRef.current?.value);
      console.log(newFeeRef.current?.value)
      if (isNaN(feeAmount) || feeAmount <= 0) {
        alert('올바른 금액을 입력해주세요.');
        return;
      }
      changeFeeInfo(community.id, feeAmount, selectedDate).then((res)=>{
        console.log(res)
        window.location.reload()
      })
    }else{
      alert("일시적으로 에러가 발생했습니다. 잠시후 다시 시도해주세요!")
    }
  };

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
            <Dropdown options={dates} defaultOption='1 일' onSelect={handleSelect} />
          </div>
          <div className='flex justify-start items-center gap-2'>
          <TextInput className="max-w-40" ref={newFeeRef} placeholder="금액 입력" />
            <div>원씩 모으기</div>
          </div>
        </div>
        <AchromaticButton className='mt-10' onClick={handleButton}>설정 완료</AchromaticButton>
      </DialogContent>
    </Dialog>
  );
}