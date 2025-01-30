'use client';

import React, { useState } from 'react';
import RecapContent from './content';

export default function RecapCarousel() {
  const [currentPeriod, setCurrentPeriod] = useState({
    year: 2025,
    quarter: 1,
  });

  const handleLeftClick = () => {
    setCurrentPeriod((prev) => {
      const newQuarter = prev.quarter === 1 ? 4 : prev.quarter - 1;
      const newYear = prev.quarter === 1 ? prev.year - 1 : prev.year;
      return { year: newYear, quarter: newQuarter };
    });
  };

  const handleRightClick = () => {
    setCurrentPeriod((prev) => {
      const newQuarter = prev.quarter === 4 ? 1 : prev.quarter + 1;
      const newYear = prev.quarter === 4 ? prev.year + 1 : prev.year;
      return { year: newYear, quarter: newQuarter };
    });
  };

  return (
    <div>
      <div className='h-full flex flex-col p-5 bg-[#bed0fc]'>
        <div className='flex justify-between items-center mb-3'>
          <button onClick={handleLeftClick} className='px-4 py-2 rounded'>
            ◀
          </button>
          <div className='text-xl'>
            {currentPeriod.year}년 {currentPeriod.quarter}분기
          </div>
          <button onClick={handleRightClick} className='px-4 py-2 rounded'>
            ▶
          </button>
        </div>

        <div className='flex flex-col items-center justify-center border-t pt-5'>
          <RecapContent
            year={currentPeriod.year}
            quarter={currentPeriod.quarter}
          />
        </div>
      </div>
    </div>
  );
}
