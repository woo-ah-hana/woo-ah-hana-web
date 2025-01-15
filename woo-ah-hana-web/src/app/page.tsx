import LoginForm from "./ui/components/auth/login-form";
import Image from "next/image";
import Logo from '@/app/assets/img/logo.png';
import { CustomAI } from "./business/ai/custom-open-ai";


export default async function Home() {
  const ai = new CustomAI();
  const result = await ai.turnIntoSearchInput("강남에서 7명이 갈 느낌 좋은 카페 추천해줘..")
  console.log(result);
  
  return (
    <div className='px-10 mb-10 flex flex-col'>
      <div className="justify-items-center">
        <Image src={Logo} alt={"우아하나로고"} width={300} height={300} priority/>
      </div>
      <div className="mb-10">
        <LoginForm/>
      </div>
    </div>
  );
}