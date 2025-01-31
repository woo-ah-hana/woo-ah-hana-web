'use client'
import Form from "@/app/ui/molecule/form/form-index";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { authenticateRegister } from "@/app/business/auth/signup.service";

export default function SignupForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [accountNumber, setAccountNumber] = useState("");
    const [bankTranId, setBankTranId] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
      setAccountNumber(searchParams.get("accountNumber") || "");
      setBankTranId(searchParams.get("bankTranId") || "");
    }, [searchParams]);

    return (
      <div>
        <Form 
          id='signup' 
          action={authenticateRegister} 
          onSuccess={() => { setIsSuccess(true); }}
          failMessageControl={"alert"}
        >
          <div className="grid grid-cols-1 gap-5">
            <Form.TextInput id="phoneNumber" label="전화번호" placeholder=""/>
            <Form.TextInput id="name" label="이름" placeholder=""/>
            <Form.PasswordInput id="password" label="비밀번호" placeholder=""/>
            <Form.PasswordInput id="confirmPassword" label="비밀번호 확인" placeholder=""/>
            <input type="hidden" id="accountNumber" name="accountNumber" value={accountNumber}></input>
            <input type="hidden" id="bankTranId" name="bankTranId" value={bankTranId}></input>
            <div>
              <Form.SubmitButton label="회원가입" position="center" className="w-full h-12"/>
            </div>
          </div>
        </Form>

        {isSuccess && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">회원가입 완료</h2>
              <p>회원가입이 성공적으로 완료되었습니다.</p>
              <button 
                onClick={() => router.push('/')} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </div>
    );
}
