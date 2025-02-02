'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import {message} from "antd";
import { setAutoDeposit } from "@/app/business/account/account.service";
import useCommunityStore from "@/app/store/community-store";

interface AutoTransferDialogProps{
  accountNumber: string,
  fee: number,
  feePeriod: number
}

export function AutoTransferDialog({accountNumber, fee, feePeriod}: AutoTransferDialogProps){
  const [messageApi, contextHolder] = message.useMessage();
  const community = useCommunityStore((state)=>{return state.community});
  
  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"secondary"} className="w-[45%]">자동이체</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="자동 이체 설정">
        <div className="px-5"><hr></hr></div>
        <div className="p-5 grid grid-cols-1 gap-5">
          
          <div className="flex flex-col gap-2">
            <div>{`현재 내 계좌: ${accountNumber}`}</div>
            <div>{`우리 모임 통장은 매월 ${feePeriod}일`}</div>
            <div>{`${fee}원씩 내요!`}</div>
          </div>

          <AchromaticButton onClick={async()=>{
            if(community.id !=='0'){
              await setAutoDeposit(community.id, fee as unknown as string, feePeriod)
              messageApi.open({
                type: 'success',
                content: '자동 이체 설정에 성공했습니다!',
                duration: 1,
                className: 'font-bold'
              });
              setTimeout(() => window.location.reload(), 1000);
            }
          }}>
            설정하기
          </AchromaticButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}