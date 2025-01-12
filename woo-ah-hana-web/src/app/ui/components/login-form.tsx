'use client'
import { authenticate } from "@/app/business/auth/login.service";
import Form from "../molecule/form/form-index";

export default function LoginForm(){

  return(
    <main>
      <Form id='login' action={authenticate} failMessageControl={"alert"}>
        <div className="grid grid-cols-1 gap-10">
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