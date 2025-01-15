import { ActivePlan } from "@/app/business/plan/active-plan";
import { Card, CardContent, CardTitle } from "../../molecule/card/card";
import { IoTimeOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineDescription } from "react-icons/md";
import { AiOutlineGlobal } from "react-icons/ai";

export function ActivePlanDetail({schedule, time, description, address, link}:ActivePlan){
  return(
    <main>
      <Card>
        <CardTitle>
          {schedule}
        </CardTitle>
        <div className="grid grid-cols-1">
          <CardContent className="grid grid-cols-[1fr_2fr gap-2]">
            <div><IoTimeOutline size={50}/></div>
            <div>{time}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_2fr gap-2]">
            <div><MdOutlineDescription size={50}/></div>
            <div>{description}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_2fr gap-2]">
            <div><IoLocationOutline size={50}/></div>
            <div>{address}</div>
          </CardContent>
          <CardContent className="grid grid-cols-[1fr_2fr gap-2]">
            <div><AiOutlineGlobal size={50}/></div>
            <div>{link}</div>
          </CardContent>
        </div>
      </Card>
    </main>
  )
}