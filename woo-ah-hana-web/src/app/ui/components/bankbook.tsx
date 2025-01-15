'use client';

import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/app/ui/molecule/card/card';
import AchromaticButton from '../atom/button/achromatic-button';

type Props = {
  title: string; // 모임통장 이름
  accountNumber: string; // 계좌번호
  balance: number; // 잔액
  footer?: React.ReactNode;
};

const Bankbook: React.FC<Props> = ({ title, accountNumber, balance, footer }) => (
<Card 
style={{
    boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.4)',
  }}
className='bg-wooahMain text-white border-wooahMain'>
    <div className='flex justify-between'>
      <CardHeader>{title}</CardHeader>
      <CardHeader>{accountNumber}</CardHeader>
    </div>
    <div className='flex flex-col justify-center items-center text-2xl mb-5 mt-2'>
      <div className='flex justify-center items-center gap-1 text-[26px]'>
        {balance} <span className='text-[20px]'> 원</span>
      </div>
    </div>
    {footer && 
    <CardFooter className='flex justify-center items-center'>
      {footer}
      </CardFooter>
      }
  </Card>
);

export default Bankbook;
