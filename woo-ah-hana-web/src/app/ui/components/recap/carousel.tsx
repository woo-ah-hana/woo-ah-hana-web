"use client";

import React, { Suspense, useState } from "react";
import RecapContent from "./content";

export default function RecapCarousel() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentQuarter = Math.floor(now.getMonth() / 3) + 1;

  const [currentPeriod, setCurrentPeriod] = useState({
    year: currentYear,
    quarter: currentQuarter,
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

      if (
        newYear > currentYear ||
        (newYear === currentYear && newQuarter > currentQuarter)
      ) {
        return prev;
      }
      return { year: newYear, quarter: newQuarter };
    });
  };

  return (
    <div>
      <div className="h-full flex flex-col bg-gray-100">
        <div className="flex justify-between items-center bg-white p-5">
          <button
            onClick={handleLeftClick}
            className="px-4 py-2 rounded text-gray-400 focus:text-black"
          >
            ◀
          </button>
          <div className="text-xl">
            {currentPeriod.year}년 {currentPeriod.quarter}분기
          </div>
          <button
            onClick={handleRightClick}
            className="px-4 py-2 rounded  text-gray-400 focus:text-black"
          >
            ▶
          </button>
        </div>

        <div className="flex flex-col items-center justify-center border-t">
          <Suspense>
            <RecapContent
              year={currentPeriod.year}
              quarter={currentPeriod.quarter}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
