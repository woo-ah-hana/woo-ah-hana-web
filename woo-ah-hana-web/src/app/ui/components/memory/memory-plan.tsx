import React from "react";
import MemoryReceiptModal from "@/app/ui/components/memory/memory-receipt.modal";

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
  console.log(category, startDate, communityId)
  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-sm text-gray-500">{date}</p>
      </div>

      <div className="flex flex-wrap gap-2 flex-row">
        {memberNames.map((name, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-wooahBlue text-wooahDeepBlue rounded-full text-lg mb-1"
          >
            {name}
          </span>
        ))}
      </div>

      <div className="mt-2">
        {locations.map((location, index) => (
          <span
            key={index}
            className={`px-3 py-1 bg-wooahPurple text-wooahDeepPurple rounded-full text-lg mr-1`}
          >
            {location}
          </span>
        ))}
      </div>
      <MemoryReceiptModal planId={planId} />
    </div>
  );
}
