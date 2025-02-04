'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import {message} from "antd";
import { setAutoDeposit,deleteAutoDeposit } from "@/app/business/account/account.service";
import useCommunityStore from "@/app/store/community-store";

interface AutoTransferDialogProps{
  accountNumber: string,
  fee: number,
  feePeriod: number,
  hasAutoDeposit: boolean,
}

export function AutoTransferDialog({accountNumber, fee, feePeriod, hasAutoDeposit}: AutoTransferDialogProps){
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
        <div className="p-5 grid grid-cols-1 gap-3">
          
          <div className="flex flex-col gap-5">
            <div className='flex justify-between items-center'>
              <div>현재 내 계좌</div>
              <div className='text-lg'>{accountNumber}</div>
            </div>
            <hr/>
            <div className="flex flex-row gap-2">
              <div>{`우리 모임 통장회비는`}</div>
              <div className="font-bold">{`매월 ${feePeriod}일,`}</div>
            </div>
            <div><strong>{`${fee}원`}</strong>이에요!</div>
          </div>

          {hasAutoDeposit ? (
            <AchromaticButton
              variant="destructive"
              className="w-full"
              onClick={async () => {
                if (community.id !== "0") {
                  deleteAutoDeposit(community.id).then((response)=>{
                    console.log(response)
                    if(response.isSuccess){
                      messageApi.open({
                        type: "success",
                        content: "자동 이체가 해제되었습니다!",
                        duration: 1,
                        className: "font-bold"
                      });
                      setTimeout(() => window.location.reload(), 300);
                    }else{
                      alert('서버에 문제가 생겼습니다. 잠시후 시도해주세요.')
                    }
                  })
                }
              }}
            >
              자동이체 해제하기
            </AchromaticButton>
          ) : (
            <AchromaticButton
              onClick={async () => {
                if (community.id !== "0") {
                  setAutoDeposit(community.id, fee as unknown as string, feePeriod).then((response)=>{
                    console.log(response)
                    if(response.isSuccess){
                      messageApi.open({
                        type: "success",
                        content: "자동 이체 설정에 성공했습니다!",
                        duration: 1,
                        className: "font-bold"
                      });
                      setTimeout(() => window.location.reload(), 300);
                    }else{
                      alert('서버에 문제가 생겼습니다. 잠시후 시도해주세요.')
                    }
                  });
                }
              }}
            >
              자동이체 설정하기
            </AchromaticButton>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}