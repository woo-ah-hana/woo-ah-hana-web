import { Card } from "../../molecule/card/card"
import Image from "next/image"

export interface PlanListItemProps{
  icons: string,
  title: string,
  category: string,
  startDate: string,
  endDate: string,
  locations: string[]
}
export function PlanListItem({icons, title, category, startDate, endDate, locations }: PlanListItemProps){
  return (
    <main>
      <Card className="grid grid-cols-3 gap-2">
        <div className="p-2 justify-items-cente">
          <Image src={icons} alt="" width={50} height={50}/>
        </div>
        <div className="grid grid-cols-1">
          <p className="text-base mt-2"><strong>{title}</strong></p>
          <p className="text-sm text-slate-700">{category}</p>
        </div>
        <div className="grid grid-cols-1">
            <p className="text-sm mt-2"><strong>{locations.map((item)=>{
                return item
            })}</strong></p>
            {/* TODO: 날짜 표기 방식 논의 필요 */}
            <p className="text-sm text-slate-700">{startDate.substring(5,10)}~{endDate.substring(5,10)}</p>
        </div>
      </Card>
    </main>
  )
}