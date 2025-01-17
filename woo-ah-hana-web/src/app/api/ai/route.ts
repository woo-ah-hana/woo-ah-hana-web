import OpenAI from "openai";

const openai = new OpenAI({apiKey: `${process.env.AI_SECRETE}`})

export async function POST(req: Request) {
  const { data } = await req.json();
  console.log(`${JSON.stringify(data)}`)
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0125',
    messages: [
      {
        role: 'system',
        content: `
            요청 데이터: ${JSON.stringify(data)}

            1. 요청 데이터 리스트의 아이템 중 link에 들어가서 정보를 확인하고
            2. 위치정보를 고려해서(mapx, mapy)
            3. 여행일정을 아래의 JSON 객체 리스트 형식으로 출력해줘.
            4. 여행기간: 2019-01-13 ~ 2019-01-15
            5. 응답 데이터는 리스트야. 추가적인 답변은 하지말아줘.
            6. 응답 형식: [{date: string, schedule:string, time:string, description: string, address: string, link: string, mapx: string, mapy: string}]
            7. 밑의 응답 예시는 단순히 예시일 뿐이야. 위 "요청 데이터"를 기반으로 답변해줘.
            8. 응답 예시: [
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
            ]`
      }
    ]
  })

  return Response.json({data: response.choices[0].message.content});
}