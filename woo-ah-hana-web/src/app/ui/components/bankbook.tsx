'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/app/ui/molecule/card';
import CardMenu from './card-menu';

type Props = {
  title: string; // 모임통장 이름
  accountNumber: string; // 계좌번호
  balance: number; // 잔액
};

const Bankbook: React.FC<Props> = ({ title, accountNumber, balance }) => (
<Card 
style={{
    boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.4)',
  }}
className='bg-wooahMain text-white'>
    <div className='flex justify-between'>
      <CardHeader>{title}</CardHeader>
      <CardHeader>{accountNumber}</CardHeader>
    </div>
    <div className='flex justify-center items-center flex-grow text-2xl mb-7 mt-2'>
      <CardContent className='flex justify-center items-center gap-1 text-[26px]'>
        {balance} <span className='text-[20px]'> 원</span>
      </CardContent>
    </div>
  </Card>
);

export default Bankbook;
