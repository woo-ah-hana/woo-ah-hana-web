'use client';

import React from 'react';
import { Card } from '@/app/ui/molecule/card/card';
import IconTransfer from '../../assets/img/icon-transfer.png';
import IconSchedule from '../../assets/img/icon-schedule.png';
import IconMemory from '../../assets/img/icon-memory.png';
import IconManagement from '../../assets/img/icon-management.png';
import IconClosing from '../../assets/img/icon-closing.png';
import IconFeeCheck from '../../assets/img/icon-fee-check.png';
import Image, { StaticImageData } from 'next/image';

type MenuItem = {
  label: React.ReactNode;
  icon: StaticImageData;
  onClick?: () => void;
};

const menuItems: MenuItem[] = [
  {
    label: (
      <>
        모임통장에
        <br />
        입금
      </>
    ),
    icon: IconTransfer,
    onClick: () => console.log('메뉴 1 클릭'),
  },
  {
    label: (
      <>
        내/모임
        <br />
        계좌관리
      </>
    ),
    icon: IconManagement,
    onClick: () => console.log('메뉴 2 클릭'),
  },
  {
    label: (
      <>
        모임 일정
        <br />
        둘러보기
      </>
    ),
    icon: IconSchedule,
    onClick: () => console.log('메뉴 3 클릭'),
  },
  {
    label: (
      <>
        지난
        <br />
        모임 추억
      </>
    ),
    icon: IconMemory,
    onClick: () => console.log('메뉴 4 클릭'),
  },
  { label: <>모임 결산</>, 
    icon: IconClosing,
    onClick: () => console.log('메뉴 5 클릭') },
  {
    label: (
      <>
        회비
        <br />
        입금 현황
      </>
    ),
    icon: IconFeeCheck,
    onClick: () => console.log('메뉴 6 클릭'),
  },
];

const CardMenu: React.FC = () => {
  return (
    <div className='grid grid-cols-2 gap-5'>
      {menuItems.map((item, index) => (
        <Card
          key={index}
          onClick={item.onClick}
          className='aspect-square flex justify-between p-4 cursor-pointer shadow hover:shadow-lg transition'
        >
          <div className='flex flex-col w-full text-[20px]'>
            <div className='h-1/2'>{item.label}</div>
            <div className='h-1/2 flex justify-end items-end'>
              <Image
                src={item.icon}
                alt='입금아이콘'
                width={70} 
                height={70}
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default CardMenu;
