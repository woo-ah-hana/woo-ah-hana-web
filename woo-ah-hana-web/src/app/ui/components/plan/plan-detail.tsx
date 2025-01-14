import { Card, CardContent } from "../../molecule/card/card";
import Image from "next/image"
import { DateDetailDilog } from "./date-detail.modal";
import IconSchedule from '@/app/assets/img/icon-schedule.png';
import IconMemory from '@/app/assets/img/icon-memory.png'
import IconLocation from '@/app/assets/img/icon-location.png'
import { MemberDetailDilog } from "./member-detail.modal";
import { LocationsDetailDilog } from "./locations-detail.modal";
import IconClosing from '@/app/assets/img/icon-closing.png'

export interface PlanDetailProps{
  id: string;
  title: string;
  category: string
  startDate: string;
  endDate: string;
  memberIds: string[];
  locations: string[];
}

export function PlanDetail({id, title, category, startDate, endDate, memberIds, locations}:PlanDetailProps){
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
          <div className="text-sm text-slate-500 mt-2">{startDate.substring(2,10)}~{endDate.substring(2,10)}</div>
          <DateDetailDilog id={id} startDate={"111111111111"} endDate={"111111111111"}/>
        </CardContent>
        <CardContent className="grid grid-cols-[1fr_4fr_2fr] gap-2">
          <Image src={IconClosing.src} alt="" width={50} height={50}/>
          <div className="text-base mt-2">{`${memberIds.length} 명 참여`}</div>
          <MemberDetailDilog id={id}/>
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