import { ActivePlan } from "@/app/business/plan/active-plan"
import { ActivePlanDetail } from "@/app/ui/components/active-plan/active-plan-detail"
import MapContainer from "@/app/ui/components/map/map-container"

export default function Home(){
  const ActivePlans = mock.map((item, index)=>{
    return(
      <main key={index}>
        <ActivePlanDetail 
        date={item.date} 
        schedule={item.schedule} 
        time={item.time} 
        description={item.description} 
        address={item.address} 
        link={item.link} 
        mapx={item.mapx} 
        mapy={item.mapy}/>
      </main>
    )
  })

  return(
    <main>
      <div className="p-5 grid grid-cols-1 gap-3">
        <MapContainer/>
        {ActivePlans}
      </div>
    </main>
  )
}

const mock:ActivePlan[] = [
    {
      date: "1월 13일",
      schedule: "동화가든에서 아침 식사",
      time: "오전 9:00 - 오전 10:30",
      description: "강릉시 초당동에 위치한 '동화가든'은 짬뽕순두부로 유명한 맛집입니다. 아침 식사로 든든하게 시작해보세요.",
      address: "강원특별자치도 강릉시 초당순두부길77번길 15 동화가든",
      link: "https://www.donghwagarden.com/",
      mapx: "1289146373",
      mapy: "377911797"
    },
    {
      date: "1월 13일",
      schedule: "카페 툇마루에서 휴식",
      time: "오전 11:00 - 오후 12:30",
      description: "동화가든에서 도보로 약 10분 거리에 위치한 전통 한옥 분위기의 카페에서 커피와 디저트를 즐기며 휴식을 취하세요.",
      address: "강원특별자치도 강릉시 난설헌로 232 카페 툇마루",
      link: "http://www.instagram.com/cafe_toenmaru",
      mapx: "1289144756",
      mapy: "377928911"
    },
    {
      date: "1월 13일",
      schedule: "세인트존스호텔 체크인 및 휴식",
      time: "오후 1:00 - 오후 3:00",
      description: "강문해변에 위치한 세인트존스호텔에서 체크인 후 인피니티풀 등 다양한 부대시설을 이용하며 휴식을 취하세요.",
      address: "강원특별자치도 강릉시 창해로 307",
      link: "https://new.stjohns.co.kr/",
      mapx: "1289209164",
      mapy: "377912822"
    },
    {
      date: "1월 13일",
      schedule: "부산처녀횟집에서 저녁 식사",
      time: "오후 6:00 - 오후 8:00",
      description: "신선한 회를 맛볼 수 있는 부산처녀횟집에서 저녁 식사를 즐겨보세요.",
      address: "강원특별자치도 강릉시 창해로 485 1층",
      link: "https://www.instagram.com/gyeongpo_busan/",
      mapx: "1289092754",
      mapy: "378034651"
    }
  ]