import { getCommunityFeeStatus, MemberFeeStatus } from '@/app/business/community/community.service';
import { UnpaidMemberList } from '@/app/ui/components/fee-status/unpaid-members';
import { PaidMemberList } from '@/app/ui/components/fee-status/paid-members';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // TODO: API 응답값이 수정되면, 리팩터링 필요
  const response = await getCommunityFeeStatus(searchParams.community as string)
  const communityFeeStatus = response.data;
  const paidMembers = communityFeeStatus?.paidMembers as MemberFeeStatus[];
  const unpaidMembers = communityFeeStatus?.unpaidMembers as MemberFeeStatus[];
  const totalMembers = paidMembers.concat(unpaidMembers);

  return (
    <div className='p-5 flex flex-col gap-8'>
      <UnpaidMemberList unpaidMembers={unpaidMembers}/>
      <hr></hr>
      <PaidMemberList members={totalMembers}/>
    </div>
  );
}
