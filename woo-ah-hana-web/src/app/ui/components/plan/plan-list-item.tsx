import Link from "next/link";
import { Card } from "../../molecule/card/card";
import { categoryColors, categoryIcons } from "../../atom/category/category";
import React from "react";
import Image from "next/image";
import IconDelete from "@/app/assets/img/icon-delete.svg";

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
        <Card className={`${bgColor} rounded-full border-none p-1`}>
          <div className="flex justify-between">
            <div className="flex">
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

              <div className="flex flex-col justify-center items-start py-2 gap-1">
                {/* <div className="text-lg font-normal">
                  <strong>{title}</strong>
                </div> */}
                <div className="text-[20px] font-semibold">
                  {title}
                </div>

                <div className="flex flex-col text-base">
                  <div className="">
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
                <div className="text-slate-600 text-base font-light">
                  {locations.map((location, index) => (
                    <span key={index}>{`#${location}  `}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center py-7 px-2">
              <Image src={IconDelete} style={{ width: 20 }} alt={"delete"} />
            </div>
          </div>
        </Card>
      </Link>
    </main>
  );
}
