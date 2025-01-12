import LoginForm from "./ui/components/login-form";

export default function Home() {
  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className="text-center">이미지 들어갈 자리</div>
      <LoginForm/>
    </div>
  );
}