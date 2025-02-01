'use client'
import { signup } from "@/app/business/auth/signup.service";
import Form from "../../molecule/form/form-index";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { generateFCMToken } from "@/app/business/notification/fcm.service";


export default function SignupForm(){
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(()=>{
    generateFCMToken().then((response)=>{
      setToken(response);
    })
  }, [])
  return(
    <main>
      <Form id='signup' action={signup} onSuccess={()=>{router.push('/')}} failMessageControl={"alert"}>
        <div className="grid grid-cols-1 gap-5">
          <Form.TextInput id="username" label="전화번호" placeholder=""/>
          <Form.TextInput id="name" label="이름" placeholder=""/>
          <Form.PasswordInput id="password" label="비밀번호" placeholder=""/>
          <Form.TextInput id="accountNumber" label="계좌번호" placeholder=""/>
          <Form.TextInput id="bankName" label="은행" placeholder=""/>
          <input value={token} type="hidden" id="token" name="token"/>
          <div>
            <Form.SubmitButton label="회원가입" position="center" className="w-full h-12 bg-blue-800"/>
          </div>
        </div>
      </Form>
    </main>
  )
}