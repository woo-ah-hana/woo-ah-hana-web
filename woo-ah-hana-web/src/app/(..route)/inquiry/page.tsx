'use client'

import { useRef } from "react";
import Header from "@/app/ui/components/header";
import TextInput from "@/app/ui/atom/text-input/text-input";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { inquiryAccountTransferLog } from "./inqurity-account.service";

export default function InquiryAccount() {
  const accountNumberRef = useRef<HTMLInputElement>(null);
  const accountPasswordRef = useRef<HTMLInputElement>(null);
  
  return (
      <>
      <Header title='거래내역을 조회해봅시다.' link='/home' />
      <div className="p-5 flex flex-col gap-5">
        <TextInput placeholder="조회할 계좌번호 입력" ref={accountNumberRef}/>
        <TextInput placeholder="비밀번호 입력" ref={accountPasswordRef}/>
        <AchromaticButton onClick={async ()=>{
          inquiryAccountTransferLog("001",accountNumberRef.current?.value as string, "2022-12-01", "2025-12-01").then((res)=>{
            console.log(res.data?.data.res_list);
          })
        }}>조회</AchromaticButton>
        <div className="flex justify-end">
        </div>
      </div>
      </>
  );
}
