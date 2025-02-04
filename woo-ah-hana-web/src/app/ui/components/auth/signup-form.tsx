'use client'
import { signup } from "@/app/business/auth/signup.service";
import Form from "../../molecule/form/form-index";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { generateFCMToken } from "@/app/business/notification/fcm.service";
import TextInput from "../../atom/text-input/text-input";
import Dropdown from "../../atom/drop-down/drop-down";
import { BankCode, BankName, banks, convertBankNameToCode } from "@/app/utils/convert";
import AchromaticButton from "../../atom/button/achromatic-button";
import { sendSMSCode, validateSMSCode } from "@/app/business/auth/sms.service";
import { sendCode } from "@/app/business/account/account.service";
import { validateAccountCode } from "@/app/business/auth/account-auth.service";


export default function SignupForm(){
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [bank, setBank] = useState<string>("하나은행");
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const smsCodeRef = useRef<HTMLInputElement>(null);
  const accountCodeRef = useRef<HTMLInputElement>(null);
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [usernameValidationState, setUsernameValidationState] = useState<boolean>(false);
  const [accountNumberValidationState, setAccountNumberValidationState] = useState<boolean>(false);
  const [checkUsername, setCheckUsername] = useState<boolean>(false);
  const [checkAccountNumber, setCheckAccountNumber] = useState<boolean>(false);

  useEffect(()=>{
    generateFCMToken().then((response)=>{
      setToken(response);
    })
  }, [])

  const handleUsernameValidation = async (username: string)=>{
    sendSMSCode(username).then((response)=>{
      if(response.data){
        setUsernameValidationState(true)
      }
    });
  }

  const handleAccountNumberValidation = async (bankCode: string, accountNumber: string)=>{
    sendCode(bankCode, accountNumber).then((response)=>{
      if(response.isSuccess){
        setAccountNumberValidationState(true)
      }
    })
  }

  return(
    <main>
      <div className="grid grid-cols-1 gap-5">
        <div className="text-center font-semibold text-2xl text-wooahMain">
          안녕하세요 우아하나입니다!
        </div>

        <div className="flex flex-row gap-3">
          <TextInput label="전화번호" ref={usernameRef}/>
          <AchromaticButton 
          className="h-14 mt-7" 
          variant={'outline'} 
          onClick={async ()=>{
            await handleUsernameValidation(usernameRef.current?.value as string)
          }}>
            {!checkUsername?`인증하기`:`인증완료!`}
          </AchromaticButton>
        </div>
        {usernameValidationState?<div className="flex flex-row gap-3">
          <TextInput label="문자로 전송된 인증코드를 입력해주세요!" ref={smsCodeRef}/>
          <AchromaticButton 
          className="h-14 mt-7"
          onClick={async ()=>{
            validateSMSCode(
              usernameRef.current?.value as string,
              smsCodeRef.current?.value as string
            ).then(
              (response)=>{
                if(response.data){
                  setUsername(usernameRef.current?.value as string);
                  setCheckUsername(true);
                }else{
                  alert("전화번호 인증에 실패했습니다. 다시 시도해주세요!")
                }
              }
            )
          }}>
            인증
          </AchromaticButton>
        </div>:<></>}
        
        <hr></hr>
        <Dropdown
          options={banks} 
          defaultOption={"은행 선택"} 
          onSelect={(selectedBank) => {
            setBank(selectedBank);
          }}
        />
        <div className="flex flex-row gap-3">
          <TextInput label="계좌번호" ref={accountNumberRef}/>
          <AchromaticButton 
          className="h-14 mt-7" 
          variant={'outline'} 
          onClick={async()=>{
            await handleAccountNumberValidation(
              convertBankNameToCode(bank as BankName) as BankCode as string, 
              accountNumberRef.current?.value as string
            )
          }}>
            {!checkAccountNumber?`인증하기`:`인증완료!`}
          </AchromaticButton>
        </div>
        {accountNumberValidationState?<div>
          <div className="mb-1 text-sm font-semibold">계좌로 1원을 보냈어요.</div>
          <div className="mb-3 text-sm font-semibold">{`입금자명 "우아하나" 뒤 세자리를 입력해주세요!`}</div>
          <div className="flex flex-row gap-3">
            <TextInput label="인증코드" ref={accountCodeRef}/>
            <AchromaticButton 
            className="h-14 mt-7"
            onClick={async()=>{
              validateAccountCode(
                accountNumberRef.current?.value as string,
                "우아하나"+accountCodeRef.current?.value as string
              ).then((response)=>{
                if(response.data){
                  setAccountNumber(accountNumberRef.current?.value as string);
                  setCheckAccountNumber(true)
                }else{
                  alert("계좌인증에 실패했습니다! 다시 시도해주세요.")
                }
              })
            }} >
              인증
            </AchromaticButton>
          </div>
        </div>:<></>}
        <div></div>
      </div>
      <hr></hr>
      <Form id='signup' action={signup} onSuccess={()=>{
          router.push("/")
        }} failMessageControl={"alert"}>
        <div className="mt-5 grid grid-cols-1 gap-5">
          <input value={username} type="hidden" id="username" name="username"/>
          <Form.TextInput id="name" label="이름" placeholder=""/>
          <Form.PasswordInput id="password" label="비밀번호" placeholder=""/>
          <input value={bank} type="hidden" id="bankName" name="bankName"/>
          <input value={accountNumber} type="hidden" id="accountNumber" name="accountNumber"/>
          <input value={token} type="hidden" id="token" name="token"/>
          <div>
            <Form.SubmitButton label="회원가입" position="center" className="w-full h-12 bg-blue-800"/>
          </div>
        </div>
      </Form>
    </main>
  )
}