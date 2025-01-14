import OpenAI from "openai";

export class CustomAI {
  private readonly openai = new OpenAI({apiKey: process.env.AI_SECRETE})
  static create(): CustomAI{
    return new CustomAI();
  }

  async extractKeywords(message: string): Promise<string>{
    const content: string = `
    요청 메세지: ${message}

    다음 요청 메세지를 분석해서 검색어로 변형해주세요.
    변형된 응답값은 naver 검색엔진의 입력값이 될 것 입니다.

    예시: "분위기 좋은 강남 맛집 추천해주세요 ~"
    응답: "분위기 좋은 강남 맛집"
    `

    const response:OpenAI.Chat.Completions.ChatCompletion 
      = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "당신은 검색어 변환기입니다. 자연어를 자연스러운 검색어로 변형합니다."
          },
          {
            role: 'user', content: content
          }
        ]
      })

      const result = response.choices[0].message.content as string;
      const data = JSON.parse(result);
      return data;
  }

}