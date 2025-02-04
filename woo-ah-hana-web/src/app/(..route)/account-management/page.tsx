import ToggleButton from '@/app/ui/atom/toggle/toggle-button';
import Header from '@/app/ui/components/header';
import {
  getCommunity,
  getCommunityMembers,
  Member,
} from '@/app/business/community/community.service';
import { AccountManagementMain } from '@/app/ui/components/account-management/account-management-main';
import { getMyAccount } from '@/app/business/account/account.service';
import { AccountManagementManager } from '@/app/ui/components/account-management/account-management-manager';
import { AccountManagementMembers } from '@/app/ui/components/account-management/account-management-members';
import { getMemberInfo } from '@/app/business/member/member.service';
import { BankCode, convertCodeToBankName } from "@/app/utils/convert";

export default async function AccountManagement({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const community = (await getCommunity(searchParams.id as string)).data;
  const myAccount   = (await getMyAccount(community?.accountNumber as string)).data;
  const communityMembers = (await getCommunityMembers(searchParams.id as string)).data;
  const myInfo = (await getMemberInfo()).data;
  
  return (
    <div className='h-full flex flex-col'>
      <Header title='계좌 관리하기' link={`/home?id=${searchParams.id}`} />
      <div className='p-5 flex flex-col gap-7'>
        <div className='flex flex-col gap-5'>
          <div className='text-[20px]'>내 출금 계좌</div>
          <AccountManagementMain 
            bankName={convertCodeToBankName(myAccount?.bankTranId as BankCode) as string}
            accountNumber={myAccount?.accountNumber as string}
            accountBalance={myAccount?.amount as number}
            setAutoDeposit={myAccount?.setAutoDeposit as boolean}
            fee={community?.fee as number} 
            feePeriod={community?.feePeriod as number}
          />
        </div>

        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-between'>
            <div>입출금 알림</div>
            <ToggleButton text={''} />
          </div>
        </div>
        <hr className='bg-gray-800 my-3' />

        {myInfo?.id === community?.managerId && (
          <>
            <AccountManagementManager
              fee={community?.fee as number}
              feePeriod={community?.feePeriod as number}
            />
            <hr className='bg-gray-800 my-3' />
          </>
        )}

        <AccountManagementMembers
          communityMembers={communityMembers as Member[]}
        />
      </div>
    </div>
  );
}
