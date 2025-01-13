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
      <Card className="grid grid-cols-3">
        <Image src={icons} alt="" width={50} height={50}/>
        <div className="grid grid-cols-1">
          <p className="text-lg"><strong>{title}</strong></p>
          <p className="text-base text-slate-700">{category}</p>
        </div>
        <div className="grid grid-cols-1">
            <p className="text-lg"><strong>{locations.map((item)=>{
                return item
            })}</strong></p>
            <p className="text-base text-slate-700">{startDate}-{endDate}</p>
        </div>
      </Card>
    </main>
  )
}