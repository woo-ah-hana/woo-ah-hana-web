import { ActivePlan } from "@/app/business/plan/active-plan";
import { Card, CardContent, CardTitle } from "../../molecule/card/card";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";

export function ActivePlanDetail({date, schedule, time, description, address, link, mapx, mapy}:ActivePlan){
  console.log(date, mapx, mapy);
  return(
    <main>
      <Card>
        <CardTitle className="p-5">
          {schedule}
        </CardTitle>
        <div>
          <CardContent className="grid grid-cols-[1fr_9fr] gap-2">
            <div><IoTimeOutline size={20}/></div>
            <div>{time}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_9fr] gap-2">
            <div><MdOutlineDescription size={20}/></div>
            <div>{description}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_9fr] gap-2">
            <div><IoLocationOutline size={20}/></div>
            <div>{address}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_9fr] gap-2">
            <div><AiOutlineGlobal size={20}/></div>
            <div><a href={`${link}`}>해당 장소 자세히 보기</a></div>
          </CardContent>
        </div>
      </Card>
    </main>
  )
}