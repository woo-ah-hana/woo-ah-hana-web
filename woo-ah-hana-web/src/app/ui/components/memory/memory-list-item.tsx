import Link from "next/link";
import { Card } from "../../molecule/card/card";
import { categoryColors, categoryIcons } from "@/app/ui/atom/category/category";
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
  communityId: string;
}

export function MemoryListItem({
  title,
  category,
  startDate,
  endDate,
  locations,
  planId,
  memberNames,
  communityId,
}: PlanListItemProps) {
  const iconSrc = categoryIcons[category];
  const bgColor = categoryColors[category];
  console.log(startDate);
  console.log(endDate);
  console.log(memberNames);
  return (
    <main>
      <Link href={`memory/detail?community=${communityId}&id=${planId}`}>
        <Card className={`${bgColor} p-3 cursor-pointer shadow-md hover:shadow-lg`}>
          <div className="flex justify-between">
            <div className="flex gap-5">
              <div className="flex flex-row justify-center items-start">
                <Image
                  src={iconSrc}
                  alt={category}
                  style={{ width: 60 }}
                  height={50}
                  width={50}
                  priority={true}
                />
              </div>

              <div className="flex flex-col justify-center items-start gap-3 py-2">
                <div className="flex flex-col gap-3 text-slate-700 text-[17px]">
                  <div className="">
                    {startDate.substring(5, 10) == endDate.substring(5, 10)
                      ? startDate.substring(5, 10)
                      : `${startDate.substring(5, 10)}부터 ${endDate.substring(
                          5,
                          10
                        )}까지`}
                  </div>
                </div>
                <div className="text-xl">
                  <strong>{title}</strong>
                </div>
                <div className="text-slate-600 font-medium text-[15px]">
                  {locations.map((location, index) => (
                    <span key={index}>{`#${location}  `}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </main>
  );
}
