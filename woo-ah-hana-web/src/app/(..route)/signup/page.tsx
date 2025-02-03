
import Image from "next/image";
import Logo from '@/app/assets/img/Logo.png';
import SignupForm from "@/app/ui/components/auth/signup-form";

export default async function Home() {

  return (
    <div className='px-10 mb-10 flex flex-col'>
      <div className="justify-items-center">
        <Image src={Logo} alt={"우아하나로고"} width={300} height={300} priority/>
      </div>
      <div className="mb-10">
        <SignupForm/>
      </div>
    </div>
  );
}