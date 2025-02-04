'use client';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/app/ui/molecule/dialog/dialog';
import { message } from 'antd';
import { FormState } from '../../molecule/form/form-root';
import Form from '../../molecule/form/form-index';
import {
  changeAccount,
  sendCode,
} from '@/app/business/account/account.service';
import { useEffect, useState } from 'react';
import IconTimer from '../../../assets/img/icon-timer-red.svg';
import Image from 'next/image';
import Dropdown from "@/app/ui/atom/drop-down/drop-down";
import { BankName, banks, convertBankNameToCode } from "@/app/utils/convert"

interface ChangeAccountDialogProps {
  accountNumber: string;
}

export function ChangeAccountDialog({
  accountNumber,
}: ChangeAccountDialogProps) {
  const [messageApi, contextHolder] = message.useMessage();
  const [newAccountNumber, setNewAccountNumber] = useState<string>('');
  // const [newBank, setNewBank] = useState<string>('');
  //   const community = useCommunityStore((state)=>{return state.community});
  const [countdown, setCountdown] = useState<number | null>(null);
  const [newBank, setNewBank] = useState<BankName>();

  useEffect(() => {
    if (countdown === null || countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  async function authenticateNewAccount(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    setNewAccountNumber(formData.get('account-number') as string);

    const bankTranId = convertBankNameToCode(newBank as BankName);
    setNewBank(bankTranId as BankName);
    const result = await sendCode(bankTranId as string, formData.get('account-number') as string);
    setCountdown(300); // 5분(300초) 타이머 시작
    return {
      isSuccess: result.isSuccess,
      isFailure: result.isFailure,
      validationError: {},
      message: result.data ? '1원을 입금하였습니다. 인증 코드를 입력하세요' : '잘못된 계좌입니다. 다시 입력해주세요.'
    }
  }

  async function changeAccountAction(prevState: FormState, formData: FormData): Promise<FormState>{
    const result = await changeAccount(newAccountNumber, newBank as string, '우아하나' + formData.get('code') as string)
    return {
      isSuccess: result.isSuccess,
      isFailure: result.isFailure,
      validationError: {},
      message: result.data ? '계좌 변경이 완료되었습니다.' : '잘못된 코드입니다. 다시 입력해주세요.'
    }
  }

  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={'secondary'} className='w-[45%]'>
          계좌변경
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent title='출금 계좌 변경' className='overflow-y-scroll max-h-[80vh]'>
        <div className='px-5'>
          <hr></hr>
        </div>
        <div className='p-5 grid grid-cols-1 gap-5'>
          <div className='flex justify-between items-center'>
            <div>현재 내 계좌</div>
            <div className='text-lg'>{accountNumber}</div>
          </div>

          <div>
            <hr></hr>
            <div className='mb-3 mt-5 text-start text-base font-medium'>
              변경할 계좌 정보
            </div>
          </div>
          <label className="block text-sm font-medium text-gray-700">은행 선택</label>
          <Dropdown
            options={banks} 
            defaultOption={"은행 선택"} 
            onSelect={(selectedBank) => {
              setNewBank(selectedBank as BankName);
            }}
          />
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
              <div className="flex flex-row gap-3">
              <Form.TextInput label="계좌번호" placeholder="" id="account-number"/>
                <div className="mt-7">
                    <Form.SubmitButton className='h-12' label="인증하기" position="center"/>
                </div>
              </div>
          </Form>
          <div>
            <hr></hr>
            <div className='mb-1 mt-3 text-start text-base font-medium'>
              인증 코드 입력
            </div>
          </div>
          <Form
            id={'auto-transfer'}
            action={changeAccountAction}
            onSuccess={() => {
              messageApi.open({
                type: 'success',
                content: '계좌변경에 성공했습니다!',
                duration: 1,
                className: 'font-bold',
              });
              setTimeout(() => window.location.reload(), 1000);
            }}
            failMessageControl={'alert'}
          >
            <div className='flex flex-col'>
                <Form.TextInput
                  label='인증코드'
                  placeholder=''
                  id='code'
                />

              <div className='self-end'>
              {countdown !== null && countdown > 0 && (
              <div className='flex flex-row justify-center items-center gap-0 text-start text-[#ec4646] mt-1 mr-1'>
                {`${Math.floor(countdown / 60)}:${String(
                  countdown % 60
                ).padStart(2, '0')}`}
                <Image src={IconTimer} alt='timer' style={{ width: '19px' }} />
              </div>
            )}
              </div>

              <div className='mt-7'>
                <Form.SubmitButton
                  className='w-full'
                  label='확인'
                  position='center'
                />
              </div>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
