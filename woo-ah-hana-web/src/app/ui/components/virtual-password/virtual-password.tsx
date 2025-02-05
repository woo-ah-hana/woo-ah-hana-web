'use client'

import { useState } from "react";
import AchromaticButton from "../../atom/button/achromatic-button";
import { useRouter } from "next/navigation";

interface VirtualPasswordProps{
  communityId: string
  tranAmt: string
  communityAccountName: string
}

export default function VirtualPassword({communityId, tranAmt, communityAccountName}:VirtualPasswordProps) {
  const router = useRouter();
  const [pwArr, setPwArr] = useState<string[]>([]);
  
  const PasswordInputs = ['1', '2', '3', '4', '5', '6', '7', '8', '9', "#", '0', "*"].map(
    (item, index) => {
      return (
        <button
          key={index}
          className="flex items-center justify-center w-16 h-16 text-2xl font-bold text-gray-800 bg-gray-200 border border-gray-200 rounded-lg shadow-md transition-all hover:bg-gray-300 active:scale-95"
          onClick={()=>{
            if(pwArr.length<4){
              const updateArr = [...pwArr, item];
              setPwArr(updateArr);
            }else{}
          }}
        >
          {item}
        </button>
      );
    }
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center mb-24 text-xl"> 계좌 비밀번호를 입력해주세요</div>
      <div className="p-6 w-fit mx-auto bg-gray-100 rounded-xl shadow-lg">
        <div className="grid grid-cols-4 mb-5">
          {pwArr.map((item, index)=>{return (<div key={index} className="text-center text-xl font-bold text-gray-800"> {'*'}</div>)})}
        </div>
        <div className="grid grid-cols-3 gap-4">{PasswordInputs}</div>
        <div className="mt-3 grid grid-cols-[1fr_1fr] gap-2">
          <AchromaticButton 
          variant={'ghost'} 
          onClick={()=>{
            const updateArr=pwArr.slice(0, pwArr.length-1);
            setPwArr(updateArr);
          }}>지우기</AchromaticButton>
          <AchromaticButton 
          variant={'ghost'}
          onClick={()=>{
            router.push(`/deposit/complete?communityId=${communityId}&amount=${tranAmt}&accountName=${communityAccountName}`)
          }}
          >확인</AchromaticButton>
        </div>
      </div>
    </div>
  );
}
