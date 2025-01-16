import Link from "next/link";
import { Card } from "../../molecule/card/card";
import { categoryColors, categoryIcons } from "../../atom/category/category";
import React from "react";

export interface PlanListItemProps {
  planId: string;
  communityId: string;
  title: string;
  startDate: string;
  endDate: string;
  category: string;
  locations: string[];
  memberNames: string[];
}

export function MemoryPlan({
  title,
  category,
  startDate,
  endDate,
  locations,
  planId,
  communityId,
  memberNames,
}: PlanListItemProps) {
  const date = endDate.split(" ")[0];
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <div className="flex flex-wrap gap-2 flex-row">
        {memberNames.map((name, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {name}
          </span>
        ))}
      </div>

      <div className="mt-2">
        {locations.map((location, index) => (
          <span
            key={index}
            className={`px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-lg mr-1`}
          >
            {location}
          </span>
        ))}
      </div>
    </div>
  );
}
