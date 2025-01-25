import Link from 'next/link';
import Bankbook from '@/app/ui/components/bankbook';
import CardMenu from '@/app/ui/components/card-menu';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import CommunityMenu from '@/app/ui/components/community-menu';
import { CommunityInfoResponseDTO, CommunityResponseDTO, getCommunity, getCommunityInfo, getCommunityList } from '@/app/business/community/community.service';
import { redirect } from 'next/navigation';
import { Community } from '@/app/business/community/community';

export default async function Home({searchParams}:{searchParams: { [key: string]: string | undefined }}) {
  const response = await getCommunityList();
  const communityIds:CommunityResponseDTO[] = response.data || [];
  if (!response.data || response.data.length === 0) {
    redirect('/community-register');
  }

  const selectedCommunityId = searchParams.id? searchParams.id : communityIds[0].communityId;

  let communityAccount;
  let community;
  if (selectedCommunityId) {
    const responseInfo = await getCommunityInfo(selectedCommunityId);
    const getCommunityResponse = await getCommunity(selectedCommunityId);
    community = getCommunityResponse.data;
    const communityInfo: CommunityInfoResponseDTO = responseInfo?.data || {name:'', accountNumber:'', balance:0};
    communityAccount = {
      name: communityInfo.name,
      accountNumber: communityInfo.accountNumber,
      balance: communityInfo.balance,
    };
  } else {
    communityAccount = {
      name: communityIds[0].name,
      accountNumber: "1111111111111",
      balance: "1000"
    };
  }

  return (
    <div>
      <CommunityMenu selectedCommunity={community as Community} communityIds={communityIds} />
      <div className='p-5'>
        <Link href={`/account-log`}>
          <Bankbook
            title={communityAccount.name}
            accountNumber={communityAccount.accountNumber}
            balance={communityAccount.balance as unknown as number}
            footer={<div className='w-full text-sm text-right'>거래내역 조회 {`>`} </div>}
          />
        </Link>
        {communityIds.length < 3 && (
          <Link href={'/community-register'}>
            <AchromaticButton variant={'outline'} className='mt-5 w-full'>
              + 모임통장 추가하기
            </AchromaticButton>
          </Link>
        )}
        <h2 className='mt-8 mb-5 text-[20px] font-bold text-wooahMain'>
          {communityAccount.name} 홈
        </h2>
        <CardMenu community={selectedCommunityId} />
      </div>
    </div>
  );
}
