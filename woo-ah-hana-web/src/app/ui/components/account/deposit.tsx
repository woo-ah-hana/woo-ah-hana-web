import { depositInfo, DepositInfoResponseDTO } from "@/app/business/account/account.service";

interface Props{
    communityId: string
}

export default async function DepositInfo({communityId} : Props) {
    const response = await depositInfo({ communityId: communityId });
    const depositInfoData : DepositInfoResponseDTO | undefined = response.data;
    
    return (
    <div>
      <div className='flex flex-col gap-10'>
        <div className='border-none shadow-none'>
          <h1 className='text-2xl'>
            내 통장<span className='text-lg'>에서</span>
          </h1>
          <p className='text-base'>
            잔액 {depositInfoData?.memberAccountBalance}원
          </p>
        </div>
        <div className='border-none shadow-none'>
          <h1 className='text-2xl'>
            {depositInfoData?.communityAccountBank} 통장
            <span className='text-lg'>으로</span>
          </h1>
          <p className='text-base'>
            계좌번호 {depositInfoData?.communityAccountNumber}
          </p>
        </div>
      </div>
    </div>
  );
}
