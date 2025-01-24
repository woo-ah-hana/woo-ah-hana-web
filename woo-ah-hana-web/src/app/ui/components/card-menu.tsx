import React from 'react';
import { Card } from '@/app/ui/molecule/card/card';
import IconTransfer from '../../assets/img/icon-transfer.png';
import IconPlan from '../../assets/img/icon-plan.png';
import IconMemory from '../../assets/img/icon-memory.png';
import IconManagement from '../../assets/img/icon-management.png';
import IconClosing from '../../assets/img/icon-closing.png';
import IconFeeCheck from '../../assets/img/icon-fee-check.png';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

export interface Props {
  community: string;
}

type MenuItem = {
  label: React.ReactNode;
  icon: StaticImageData;
  link: string;
};

export default function CardMenu({ community }: Props) {
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
      link: '/deposit',
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
      link: `/account-management?id=${community}`,
    },
    {
      label: (
        <>
          모임 일정
          <br />
          둘러보기
        </>
      ),
      icon: IconPlan,
      link: `/plan?id=${community}`,
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
      link: `/memory?id=${community}`,
    },
    {
      label: <>모임 결산</>,
      icon: IconClosing,
      link: `/closing?id=${community}`,
    },
    {
      label: (
        <>
          회비
          <br />
          입금 현황
        </>
      ),
      icon: IconFeeCheck,
      link: `/fee-status?community=${community}`,
    },
  ];

  return (
    <div className='grid grid-cols-2 gap-5'>
      {menuItems.map((item, index) => (
        <Link href={item.link} key={index}>
          <Card className='aspect-square flex justify-between p-4 cursor-pointer shadow hover:shadow-lg transition'>
            <div className='flex flex-col w-full text-[20px]'>
              <div className='h-1/2'>{item.label}</div>
              <div className='h-1/2 flex justify-end items-end'>
                <Image
                  src={item.icon}
                  alt='입금아이콘'
                  style={{ width: 70, height: 70 }}
                  priority={true}
                />
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}
