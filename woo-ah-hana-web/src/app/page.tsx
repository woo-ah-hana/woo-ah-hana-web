import LoginForm from "./ui/components/login-form";
import Image from "next/image";
import Logo from '@/app/assets/img/logo.png';


export default function Home() {
  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className="justify-items-center">
        <Image src={Logo} alt={"우아하나로고"} width={300} height={300}></Image>
      </div>
      <LoginForm/>
    </div>
  );
}