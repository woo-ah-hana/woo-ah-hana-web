'use client';

import AchromaticButton from '../../atom/button/achromatic-button';
import TextInput from '../../atom/text-input/text-input';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '../../molecule/dialog/dialog';
import { useState } from 'react';

const MemberInviteModal: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false); 

    const handleCancelButton = () => {
        setIsOpen(false); 
    }

    const handleInviteButton = () => {
        setIsOpen(false); 
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <AchromaticButton className='w-full'>멤버 초대하기</AchromaticButton>
            </DialogTrigger>
            <DialogContent className='p-10'>
                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-2'>
                        <div>초대하고 싶은 사람의</div>
                        <div>
                            <span className='font-semibold'>전화번호</span>를 입력해주세요.
                        </div>
                    </div>

                    <TextInput />
                    <div className='w-full flex items-center justify-between gap-4'>
                        <AchromaticButton className='w-full' variant={'outline'} onClick={handleCancelButton}>취소</AchromaticButton>
                        <AchromaticButton className='w-full' onClick={handleInviteButton}>초대하기</AchromaticButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default MemberInviteModal;
