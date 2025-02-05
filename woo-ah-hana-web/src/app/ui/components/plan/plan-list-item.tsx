"use client";

import Link from "next/link";
import { Card } from "../../molecule/card/card";
import { categoryColors, categoryIcons } from "../../atom/category/category";
import React from "react";
import Image from "next/image";
import Form from "../../molecule/form/form-index";
import { deletePlan } from "@/app/business/plan/plan.service";

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
        <Card className={`${bgColor} rounded-full border-none p-1 cursor-pointer shadow-md hover:shadow-lg`}>
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
                <div className="text-[20px] font-semibold">{title}</div>

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
                <div className="text-slate-600 text-base font-medium">
                  {locations.map((location, index) => (
                    <span key={index}>{`#${location}  `}</span>
                  ))}
                </div>
              </div>
            </div>
              <div className="flex justify-center items-center py-7 px-2">
                <Form
                  id={"delete-post"}
                  action={deletePlan}
                  failMessageControl={"alert"}
                  onSuccess={() => {
                    window.location.reload();
                  }}
                >
                  <div className="flex flex-row">
                    <input
                      id="id"
                      name="id"
                      value={planId}
                      onChange={() => {}}
                      className="hidden"
                    />
                    <Form.SubmitButton
                      label="X"
                      className="bg-[bgColor] text-gray-500 shadow-none hover:bg-[bgColor]"
                      onClick={(event) => event.stopPropagation()}
                    />
                  </div>
                </Form>
              </div>
          </div>
        </Card>
      </Link>
    </main>
  );
}
