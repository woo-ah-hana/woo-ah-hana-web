import React from "react";
import MemoryReceiptModal from "@/app/ui/components/memory/memory-receipt.modal";
import dayjs from "dayjs";

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
  console.log(startDate, endDate);
  const sdate = startDate.split(" ")[0];
  const edate = endDate.split(" ")[0];
  const diff = dayjs(edate).diff(dayjs(sdate), "day");
  console.log(category, startDate, communityId);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <p className="text-sm text-gray-500">
        {sdate == edate
          ? `${sdate}, 하루`
          : `${sdate}부터 ${edate}까지, ${diff + 1}일`}
      </p>
      <div className="flex flex-wrap gap-1 flex-row">
        {memberNames.map((name, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-wooahBlue text-wooahDeepBlue rounded-full text-sm mb-1"
          >
            {name}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-1 flex-row mt-2">
        {locations.map((location, index) => (
          <span
            key={index}
            className={`px-3 py-1 bg-wooahPurple text-wooahDeepPurple rounded-full text-sm mr-1 break-all`}
          >
            {location}
          </span>
        ))}
      </div>
      <MemoryReceiptModal planId={planId} />
    </div>
  );
}
