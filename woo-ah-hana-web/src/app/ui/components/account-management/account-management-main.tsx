'use client'

import AchromaticButton from "../../atom/button/achromatic-button"
import Bankbook from "../bankbook"

interface AccountManagementProps{
  communityName: string;
  accountNumber: string;
  accountBalance: number;
}

export function AccountManagementMain({communityName, accountNumber, accountBalance}:AccountManagementProps){
  return (
    <main>
      <Bankbook
        title={communityName}
        accountNumber={accountNumber}
        balance={accountBalance}
        footer={
          <div className="w-[100%] flex justify-between">
            <AchromaticButton variant={"secondary"} className="w-[45%]" onClick={()=>{}}>
              자동이체
            </AchromaticButton>
            <AchromaticButton variant={"secondary"} className="w-[45%]" onClick={()=>{}}>
              계좌변경
            </AchromaticButton>
          </div>
          }
      />
    </main>
  )
}