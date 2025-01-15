export interface NaverSearchResult{
  title: string;
  link: string;
  category: string;
  description: string;
  telephone: string;
  address: string;
  roadAddress: string;
  mapx: string;
  mapy: string;
}

export interface ActivePlan{
  date: string;
  schedule: string;
  time: string;
  description: string;
  address: string;
  link: string;
  mapx: string;
  mapy: string;
}

export const mockSearchData: NaverSearchResult[] = [
    {
        title: "노티드 스튜디오 청담",
        link: "https://smartstore.naver.com/cafeknotted",
        category: "음식점>카페,디저트>카페",
        description: "",
        telephone: "",
        address: "서울특별시 강남구 신사동 654-9 1층",
        roadAddress: "서울특별시 강남구 도산대로53길 15 1층",
        mapx: "1270383006",
        mapy: "375241929"
    },
    {
        title: "노티드 삼성",
        link: "https://smartstore.naver.com/cafeknotted",
        category: "음식점>카페,디저트>카페",
        description: "",
        telephone: "",
        address: "서울특별시 강남구 삼성동 168-26 1층",
        roadAddress: "서울특별시 강남구 테헤란로103길 9 1층",
        mapx: "1270640471",
        mapy: "375100993"
    },
    {
        title: "런던베이글뮤지엄 도산점",
        link: "https://app.catchtable.co.kr/ct/shop/london_bagel_museum_dosan",
        category: "카페,디저트>베이커리",
        description: "",
        telephone: "",
        address: "서울특별시 강남구 신사동 642-25 1, 2층",
        roadAddress: "서울특별시 강남구 언주로168길 33 1, 2층",
        mapx: "1270364528",
        mapy: "375260816"
    }
  ]
  