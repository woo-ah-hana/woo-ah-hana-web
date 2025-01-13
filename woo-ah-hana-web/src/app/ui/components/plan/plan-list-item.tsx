import Link from "next/link"
import { Card } from "../../molecule/card/card"
import Image from "next/image"

export interface PlanListItemProps{
  icons: string,
  title: string,
  category: string,
  startDate: string,
  endDate: string,
  locations: string[],
  planId: string
}
export function PlanListItem({icons, title, category, startDate, endDate, locations, planId }: PlanListItemProps){
  return (
    <main>
      <Link href={`plan/detail?id=${planId}`}>
        <Card className="grid grid-cols-[1fr_1fr_2fr] gap-2">
            <div className="p-2 flex justify-center items-center">
            <Image src={icons} alt="" width={50} height={50}/>
            </div>
            <div className="grid grid-cols-1">
            <p className="text-base mt-2"><strong>{title}</strong></p>
            <p className="text-sm text-slate-500">{`# ${category}`}</p>
            </div>
            <div className="grid grid-cols-1">
                <p className="text-sm mt-2"><strong>{locations.map((item)=>{
                    return item
                })}</strong></p>
                {/* TODO: 날짜 표기 방식 논의 필요 */}
                <p className="text-sm text-slate-500">{startDate.substring(5,10)}~{endDate.substring(5,10)}</p>
            </div>
        </Card>
      </Link>
    </main>
  )
}