'use client'
import { getCommunityTransferRecords, Transfer } from "@/app/business/community/community.service";
import useCommunityStore from "@/app/store/community-store";
import Dropdown from "@/app/ui/atom/drop-down/drop-down";
import TransferList from "@/app/ui/components/account/transfer-list";
import Bankbook from "@/app/ui/components/bankbook";
import { useEffect, useState } from "react";

export default function AccountLog() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [period, setPeriod] = useState<number>(1);
  const community = useCommunityStore((state)=>{return state.community});
  
  useEffect(()=>{
    if(community.id=='0')return;
    getCommunityTransferRecords(community.id, period).then((response)=>{
      const data = response.data?.reverse();
      setTransfers(data as Transfer[])
    })
  }, [community, period]);

  return (
      <div className="p-5 flex flex-col gap-5">
        <Bankbook
            title={community.name}
            accountNumber={community.accountNumber}
            balance={transfers.length==0?0:transfers[0].afterBalanceAmt as unknown as number}
            footer={<div></div>}
        />
        <div className="flex justify-end">
          <Dropdown deafault = '1개월' options={['1 개월', '3 개월', '6 개월']} onSelect={()=>{setPeriod(new Number('3 개월'.substring(0,1)).valueOf())}}/> 
        </div>
        <TransferList transfers={transfers}/>
      </div>
  );
}
