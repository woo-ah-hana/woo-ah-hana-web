import { Card, CardContent } from "../../molecule/card/card";
import Image from "next/image"
import { DateDetailDilog } from "./date-detail.modal";
import IconSchedule from '@/app/assets/img/icon-plan.png';
import IconMemory from '@/app/assets/img/icon-memory.png'
import IconLocation from '@/app/assets/img/icon-location.png'
import { MemberDetailDilog } from "./member-detail.modal";
import { LocationsDetailDilog } from "./locations-detail.modal";
import IconClosing from '@/app/assets/img/icon-closing.png'
import { convertDateWithoutYear } from "@/app/utils/convert";

export interface PlanDetailProps{
  id: string;
  communityId: string;
  title: string;
  category: string
  startDate: string;
  endDate: string;
  memberIds: string[];
  memberNames: string[]
  communityMemberIds: string[];
  communityMemberNames: string[]
  locations: string[];
}

export function PlanDetail({id, communityId, title, category, startDate, endDate, memberIds, memberNames, communityMemberIds, communityMemberNames, locations}:PlanDetailProps){
  return(
    <main>
      <Card className="grid gird-cols-1 text-center">
        <CardContent className="grid grid-cols-[1fr_4fr_2fr] gap-2 mt-5">
          <Image src={IconMemory.src} alt="" width={50} height={50}/>
          <div className="text-base mt-2">{title}</div>
          <div className="text-sm text-slate-600  mt-2">{`# ${category}`}</div>
        </CardContent>
        <CardContent className="grid grid-cols-[1fr_4fr_2fr] gap-2">
          <Image src={IconSchedule.src} alt="" width={50} height={50}/>
          <div className="text-sm text-slate-500 mt-2">
            {convertDateWithoutYear(startDate)} ~ {convertDateWithoutYear(endDate)}
          </div>
          <DateDetailDilog id={id}/>
        </CardContent>
        <CardContent className="grid grid-cols-[1fr_4fr_2fr] gap-2">
          <Image src={IconClosing.src} alt="" width={50} height={50}/>
          <div className="text-base mt-2">{`${memberIds.length} 명 참여`}</div>
          <MemberDetailDilog id={id} communityId={communityId} memberIds={memberIds} memberNames={memberNames} communityMemberIds={communityMemberIds} communityMemberNames={communityMemberNames} />
        </CardContent>
        <CardContent className="grid grid-cols-[1fr_4fr_2fr] gap-2">
          <Image src={IconLocation.src} alt="" width={50} height={50}/>
          <div className="text-base mt-2">{`${locations[0]} 외 ${locations.length-1}`}</div>
          <LocationsDetailDilog id={id}/>
        </CardContent>
      </Card>
    </main>
  )
}