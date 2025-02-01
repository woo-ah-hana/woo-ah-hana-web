import Link from "next/link";
import { Card } from "../../molecule/card/card";
import { categoryColors, categoryIcons } from "../../atom/category/category";
import React from "react";
import Image from "next/image";

export interface PlanListItemProps {
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  locations: string[];
  planId: string;
  memberNames: string[];
}

export function MemoryListItem({
  title,
  category,
  startDate,
  endDate,
  locations,
  planId,
  memberNames,
}: PlanListItemProps) {
  const iconSrc = categoryIcons[category];
  const bgColor = categoryColors[category];
  console.log(startDate);
  console.log(endDate);
  return (
    <main>
      <Link href={`memory/detail?id=${planId}`}>
        <Card className={`grid grid-cols-[1fr_2fr_2fr] gap-2 ${bgColor}`}>
          <div className="p-2 flex justify-center items-center">
            <Image src={iconSrc} alt={category} height={50} width={50} priority />
          </div>
          <div className="grid grid-cols-1">
            <p className="text-base mt-2">
              <span className="[word-break:keep-all]">{title}</span>
            </p>
            <p className="text-sm text-slate-500">{`# ${category}`}</p>
          </div>
          <div className="grid grid-cols-1 ">
            <p className="text-sm mt-2">
              <strong>{locations[0]}</strong>
            </p>
            <p className="text-sm text-slate-500">
              {startDate.substring(5, 10) == endDate.substring(5, 10) ?
                  startDate.substring(5, 10)  : `${startDate.substring(5, 10)}부터 ${endDate.substring(5, 10)}까지`}
            </p>
          </div>
        </Card>
      </Link>
    </main>
  );
}
