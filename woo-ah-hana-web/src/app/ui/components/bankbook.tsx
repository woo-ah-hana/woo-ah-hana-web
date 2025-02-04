import React from 'react';
import { Card, CardFooter, CardHeader } from '@/app/ui/molecule/card/card';

type Props = {
  title: string;
  accountNumber: string;
  balance: number;
  footer?: React.ReactNode;
};

export default function Bankbook({ title, accountNumber, balance, footer }: Props) {
  const formattedBalance =(typeof balance === 'number')? balance.toLocaleString():balance;

  return (
    <Card
      style={{
        boxShadow: '2px 5px 8px rgba(0, 0, 0, 0.4)',
      }}
      className='bg-wooahMain text-white border-wooahMain'
    >
      <div className='flex justify-between'>
        <CardHeader>{title}</CardHeader>
        <CardHeader>{accountNumber}</CardHeader>
      </div>
      <div className='flex flex-col justify-center items-center text-2xl mb-5 mt-2'>
        <div className='flex justify-center items-center gap-1 text-[26px]'>
          {formattedBalance} <span className='text-[20px]'> 원</span>
        </div>
      </div>
      {footer && (
        <CardFooter className='flex justify-center items-center'>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}
