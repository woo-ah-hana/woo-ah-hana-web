import OpenAI from "openai";

export class CustomAI {
  private readonly openai = new OpenAI({apiKey: `${process.env.AI_SECRETE}`})
  static create(): CustomAI{
    return new CustomAI();
  }

  async turnIntoSearchInput(message: string): Promise<string>{
    const content: string = `
    다음 요청 메세지를 분석해서 한국어 문자열로 변형해주세요.
    변형된 응답값은 naver 검색엔진의 입력값이 될 것 입니다.
    응답값 외 다른 매세지는 반환 금지입니다.

    요청 메세지: ${message}
    응답 형식: string

    요청 메세지 예시: "분위기 좋은 강남 맛집 추천해주세요 ~"
    응답 예시: "분위기 좋은 강남 맛집"
    `

    const response:OpenAI.Chat.Completions.ChatCompletion 
      = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "당신은 검색어 변환기입니다. 자연어를 검색엔진에 입력될 검색어로 변형합니다."
          },
          {
            role: 'user', content: content
          }
        ]
      })

      const result = response.choices[0].message.content as string;
      const data = JSON.parse(result) as string;
      return data;
  }

}