'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import {message} from "antd";
import { FormState } from "../../molecule/form/form-root";
import Form from "../../molecule/form/form-index";
import { changeAccount, sendCode } from "@/app/business/account/account.service";
import { useState } from "react";

interface ChangeAccountDialogProps{
  accountNumber: string,
}

export function ChangeAccountDialog({accountNumber}: ChangeAccountDialogProps){
  const [messageApi, contextHolder] = message.useMessage();
  const [newAccountNumber, setNewAccountNumber] = useState<string>("");
  const [newBank, setNewBank] = useState<string>("");
//   const community = useCommunityStore((state)=>{return state.community});

  async function authenticateNewAccount(prevState: FormState, formData: FormData):Promise<FormState>{
    setNewAccountNumber(formData.get('account-number') as string);
    setNewBank(formData.get('bank') as string)
    await sendCode(formData.get('bank') as string, formData.get('account-number') as string);
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '자동이체 성공'
    }
  }

  async function changeAccountAction(prevState: FormState, formData: FormData): Promise<FormState>{
    await changeAccount(newAccountNumber, newBank, formData.get('code') as string)
    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: '자동이체 성공'
    }
  }
  
  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"secondary"} className="w-[45%]">계좌변경</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="자동 이체 설정">
        <div className="px-5"><hr></hr></div>
        <div className="p-5 grid grid-cols-1 gap-5">
          
          <div className="flex flex-col gap-2">
            <div>{`현재 내 계좌: ${accountNumber}`}</div>
          </div>
          
          <div>
            <hr></hr>
            <div className="mb-1 mt-3 text-center text-base font-medium">변경할 계좌 정보 입력</div>
          </div>
          <Form 
          id={"send-code"} 
          action={authenticateNewAccount} 
          onSuccess={()=>{
            messageApi.open({
              type: 'success',
              content: '계좌에 1원을 보냈어요!',
              duration: 1,
              className: 'font-bold'
            });
          }}
          failMessageControl={"alert"}>
            <div className="flex flex-col gap-3">
              <Form.TextInput label="계좌번호" placeholder="" id="account-number"/>
              <div className="flex flex-row gap-3">
                <Form.TextInput label="은행" placeholder="" id="bank"/>
                <div className="mt-7">
                    <Form.SubmitButton className='h-12' label="등록" position="center"/>
                </div>
              </div>
            </div>
          </Form>
          <div>
            <hr></hr>
            <div className="mb-1 mt-3 text-center text-base font-medium">인증 코드 입력</div>
          </div>
          <Form 
          id={"auto-transfer"} 
          action={changeAccountAction} 
          onSuccess={()=>{
            messageApi.open({
              type: 'success',
              content: '계좌변경에 성공했습니다!',
              duration: 1,
              className: 'font-bold'
            });
            setTimeout(() => window.location.reload(), 1000);
          }} 
          failMessageControl={"alert"}>
            <div className="flex flex-row gap-3">
              <Form.TextInput label="인증코드 입력" placeholder="" id="code"/>
              <div className="mt-7">
                <Form.SubmitButton className='h-12' label="변경하기" position="center"/>
              </div>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}