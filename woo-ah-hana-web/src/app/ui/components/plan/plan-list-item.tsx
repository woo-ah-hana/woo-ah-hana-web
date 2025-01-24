import Link from 'next/link';
import { Card } from '../../molecule/card/card';
import { categoryColors, categoryIcons } from '../../atom/category/category';
import React from 'react';
import Image from 'next/image';
import IconDelete from '../../../assets/img/icon-delete.svg';

export interface PlanListItemProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  locations: string[];
  planId: string;
  communityId: string;
}

export function PlanListItem({
  title,
  category,
  startDate,
  endDate,
  locations,
  planId,
  communityId,
}: PlanListItemProps) {
  const iconSrc = categoryIcons[category];
  const bgColor = categoryColors[category];
  return (
    <main>
      <Link href={`plan/detail?community=${communityId}&id=${planId}`}>
        <Card className={`${bgColor} p-4`}>
          <div className='flex justify-between'>
            <div className='flex gap-5'>
              <div className='flex flex-row justify-center items-start'>
                <Image
                  src={iconSrc}
                  alt={category}
                  style={{ width: 60 }}
                  height={50}
                  width={50}
                  priority={true}
                />
              </div>

              <div className='flex flex-col justify-center items-start gap-4 py-2'>
              <div className='flex flex-col gap-3 text-slate-700 text-[17px]'>
                <div className=''>{startDate.substring(5, 10)} ~ {endDate.substring(5, 10)}</div>
              </div>
                <div className='text-xl'>
                  <strong>{title}</strong>
                </div>
                <div className='text-slate-600 font-semibold text-[15px]'>
                {locations.map((location, index) => (
                    <span key={index}>{`#${location}  `}</span>
                  ))}
                  </div>
              </div>
            </div>
            <div className='flex justify-center items-start py-2'>
              <Image src={IconDelete} style={{width:20}} alt={'delete'}/>
            </div>
          </div>
        </Card>
      </Link>
    </main>
  );
}
