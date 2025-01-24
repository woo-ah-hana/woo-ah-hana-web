'use client'
import { getCommunityTransferRecords, Transfer } from "@/app/business/community/community.service";
import useCommunityStore from "@/app/store/community-store";
import TransferList from "@/app/ui/components/account/transfer-list";
import Bankbook from "@/app/ui/components/bankbook";
import { useEffect, useState } from "react";

export default function AccountLog() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const community = useCommunityStore((state)=>{return state.community});
  
  useEffect(()=>{
    if(!community)return;
    getCommunityTransferRecords(community, 1).then((response)=>{
      setTransfers(response.data as Transfer[])
    })
  }, [community]);

  return (
      <div className="p-5 flex flex-col gap-5">
        {/* <div className="flex justify-end">
          <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
          >
            <Typography.Link>
              <Space className="text-[13px]">
                최근{selectedLabel}
                <DownOutlined />
              </Space>
            </Typography.Link>
          </Dropdown>
        </div> */}

        <Bankbook
            title={"모임통장"}
            accountNumber={"1232321312"}
            balance={1000}
            footer={<div></div>}
        />
        <TransferList transfers={transfers}/>
      </div>
  );
}
