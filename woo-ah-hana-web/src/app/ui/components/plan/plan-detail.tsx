import { Card, CardContent } from "../../molecule/card/card";
import Image from "next/image"

export interface PlanDetailProps{
  icons: string;
  title: string;
  category: string
  startDate: string;
  endDate: string;
  memberIds: string[];
  locations: string[];
}

export function PlanDetail({icons, title, category, startDate, endDate, memberIds, locations}:PlanDetailProps){
  return(
    <main>
      <Card className="grid gird-cols-1">
        <CardContent className="grid gird-cols-[1fr_4fr_2fr]">
          <Image src={icons} alt="" width={50} height={50}/>
          <div className="text-base">{title}</div>
          <div className="tect-sm text-slate-600">{category}</div>
        </CardContent>
        <CardContent className="grid gird-cols-[1fr_4fr_2fr]">
          <div className="text-sm text-slate-500">{startDate.substring(3,10)}~{endDate.substring(3,10)}</div>
        </CardContent>
        <CardContent className="grid gird-cols-[1fr_4fr_2fr]">
          <div className="text-base">{`${memberIds.length} 명 참여`}</div>
        </CardContent>
        <CardContent className="grid gird-cols-[1fr_4fr_2fr]">
          <div className="text-base">{`${locations[0]}`}</div>
        </CardContent>
      </Card>
    </main>
  )
}