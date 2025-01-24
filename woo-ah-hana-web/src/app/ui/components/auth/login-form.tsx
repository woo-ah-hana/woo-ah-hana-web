'use client'
import { authenticate } from "@/app/business/auth/login.service";
import Form from "../../molecule/form/form-index";
import { useRouter } from "next/navigation";


export default function LoginForm(){
  const router = useRouter();

  return(
    <main>
      <Form id='login' action={authenticate} onSuccess={()=>{router.push('/home')}} failMessageControl={"alert"}>
        <div className="grid grid-cols-1 gap-5">
          <Form.TextInput id="username" label="이름" placeholder=""/>
          <Form.TextInput id="phone" label="전화번호" placeholder=""/>
          <Form.PasswordInput id="password" label="비밀번호" placeholder=""/>
          <div>
            <Form.SubmitButton label="로그인" position="center" className="w-full h-12"/>
          </div>
        </div>
      </Form>
    </main>
  )
}