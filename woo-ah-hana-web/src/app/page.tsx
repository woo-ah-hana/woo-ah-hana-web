import LoginForm from "./ui/components/auth/login-form";
import Image from "next/image";
import Logo from '@/app/assets/img/Logo.png';
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import Link from "next/link";

export default async function Home() {

  return (
    <div className='px-10 mb-10 flex flex-col'>
      <div className="justify-items-center">
        <Image src={Logo} alt={"우아하나로고"} width={300} height={300} priority/>
      </div>
      <div className="mb-8">
        <LoginForm/>
      </div>
      <div>
        <p className='text-sm font-semibold'>아직 우아하나의 회원이 아니신가요?</p>
        <Link href='/signup'>
          <AchromaticButton className='w-full h-12 bg-blue-800'>회원가입</AchromaticButton>
        </Link>
      </div>
    </div>
  );
}