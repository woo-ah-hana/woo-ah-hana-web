import { CardContent } from "../../molecule/card/card";
import { DateDetailDilog } from "./date-detail.modal";
import { MemberDetailDilog } from "./member-detail.modal";
import { LocationsDetailDilog } from "./locations-detail.modal";
import { convertDateWithoutYear } from "@/app/utils/convert";
import {
  categoryIconBg,
} from "@/app/ui/atom/category/category";
import IconPlan from "@/app/assets/img/icon-plan.png";
import IconManagetment from "@/app/assets/img/icon-management.png";
import Image from "next/image";
import IconPlace from "@/app/assets/img/icon-place.png";
export interface PlanDetailProps {
  id: string;
  title: string;
  category: string;
  startDate: string;
  endDate: string;
  memberIds: string[];
  memberNames: string[];
  communityMemberIds: string[];
  communityMemberNames: string[];
  locations: string[];
}

export function PlanDetail({
  id,
  title,
  category,
  startDate,
  endDate,
  memberIds,
  memberNames,
  communityMemberIds,
  communityMemberNames,
  locations,
}: PlanDetailProps) {
  const iconBg = categoryIconBg[category];
  return (
    <main>
      <img src={iconBg} alt="" />
      <div className="pl-2 pr-2">
        <CardContent className="gap-2 mt-2 p-3">
          <div>
            <div className="text-xl text-start font-bold">{title}</div>
            <div className="text-base text-slate-600 text-start">{`# ${category}`}</div>
          </div>
        </CardContent>
        <CardContent className="grid grid-cols-[2fr_6fr_2fr] gap-2 p-3 items-center">
          <Image
            src={IconPlan}
            alt=""
            className="bg-wooahPurple rounded-full"
            width={40}
            height={40}
          />
          <div>
            <div className="text-sm text-gray-500">일정</div>
            <div className="text-base">
              {convertDateWithoutYear(startDate)} ~{" "}
              {convertDateWithoutYear(endDate)}
            </div>
          </div>
          <DateDetailDilog id={id} />
        </CardContent>
        <CardContent className="grid grid-cols-[2fr_6fr_2fr] gap-2 p-3 items-center">
          <Image
            src={IconManagetment}
            alt=""
            className="bg-wooahBlue rounded-full"
            width={40}
            height={40}
          />
          <div>
            <div className="text-sm text-gray-500">참여 인원</div>
            <div className="text-base">{`${memberIds.length} 명 참여`}</div>
          </div>
          <MemberDetailDilog
            id={id}
            memberIds={memberIds}
            memberNames={memberNames}
            communityMemberIds={communityMemberIds}
            communityMemberNames={communityMemberNames}
          />
        </CardContent>
        <CardContent className="grid grid-cols-[2fr_6fr_2fr] gap-2 p-3 items-center">
          <Image
            src={IconPlace}
            alt=""
            className="bg-wooahRed rounded-full"
            width={40}
            height={40}
          />
          <div>
            <div className="text-sm text-gray-500">장소</div>
            <div className="text-base">{`${locations[0]} 외 ${
              locations.length - 1
            }`}</div>
          </div>
          <LocationsDetailDilog id={id} locations={locations} />
        </CardContent>
      </div>
    </main>
  );
}
