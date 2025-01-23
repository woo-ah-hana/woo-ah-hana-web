'use client';

import { useState, useEffect } from 'react';

type SelectProps = {
    children?: React.ReactNode;
  };

export default function Carousel({ children }: SelectProps) {
  const [currentPeriod, setCurrentPeriod] = useState({ year: 2025, quarter: 1 });
  const [content, setContent] = useState('');

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

  useEffect(() => {
    const fetchData = async () => {
      // Todo: 분기 변경 기간 설정(생성날짜기준)
      const data = `This is content for ${currentPeriod.year} Q${currentPeriod.quarter}.`;
      setContent(data);
    };

    fetchData();
  }, [currentPeriod]);

  return (
    <div className="h-full flex flex-col p-5">

      <div className="flex justify-between items-center mb-5">
        <button onClick={handleLeftClick} className="px-4 py-2 bg-gray-200 rounded">←</button>
        <h1 className="text-xl font-bold">
          {currentPeriod.year}년 {currentPeriod.quarter}분기
        </h1>
        <button onClick={handleRightClick} className="px-4 py-2 bg-gray-200 rounded">→</button>
      </div>

      <div className="flex flex-col items-center justify-center border-t pt-5">
        <p className="text-lg">{content}</p>
        {children}
      </div>
    </div>
  );
}
