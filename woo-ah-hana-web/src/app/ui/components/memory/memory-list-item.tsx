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
        <Card
          className={`${bgColor} rounded-2xl border-none p-1 cursor-pointer shadow-md hover:shadow-lg`}
        >
          <div>
            <div className="flex justify-between p-1">
              <div className="flex flex-row">
                <div className="flex flex-row justify-center items-center ml-2 mr-1">
                  <Image
                    src={iconSrc}
                    alt={category}
                    style={{ width: 60 }}
                    height={50}
                    width={50}
                    priority={true}
                    className="p-1"
                  />
                </div>
                <div className="flex flex-col justify-center items-start py-2 gap-2">
                  <div className="text-[20px] font-semibold">{title}</div>
                  <div className="flex flex-col text-base">
                    <div>
                      {startDate.substring(5, 10) == endDate.substring(5, 10)
                        ? startDate.substring(5, 10)
                        : `${startDate.substring(2, 4)}.${startDate.substring(
                            5,
                            7
                          )}.${startDate.substring(2, 4)}
                      
                      
                      ~ ${endDate.substring(2, 4)}.${endDate.substring(
                            5,
                            7
                          )}.${endDate.substring(8, 10)}
                      `}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-slate-600 text-base font-medium text-center pb-1">
              {locations.map((location, index) => (
                <span key={index}>{`#${location}  `}</span>
              ))}
            </div>
          </div>
        </Card>
      </Link>
    </main>
  );
}
