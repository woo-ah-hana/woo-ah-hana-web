'use client';

import { useRouter } from 'next/navigation';
import { transfer, TransferRequestDTO } from '@/app/business/account/account.service';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';

export default function DepositCheck({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const router = useRouter();
  const accountNumber = searchParams.accountNumber || '';
  const bankTranId = searchParams.bankTranId || '';
  const tranAmt = searchParams.amount || '';

  const handleTransfer = async () => {
    const requestBody: TransferRequestDTO = {
      accountNumber: accountNumber,
      bankTranId: bankTranId,
      printContent: "모임 회비",
      inoutType: "출금",
      tranAmt: tranAmt,
    };

    try {
      const response = await transfer(requestBody); 
      console.log('Transfer success:', response);

      if(response.isSuccess){
        router.push('/deposit/complete');
      }
      
    } catch (error) {
      console.error('Transfer failed:', error);
      alert('송금 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='h-screen p-10 flex flex-col justify-between'>
      <div className='mt-10 text-2xl align-center justify-center text-center flex flex-col gap-4'>
        <h1>모임 통장으로</h1>
        <h1>
          <span className='text-3xl'>{tranAmt}</span> 원을
        </h1>
        <h1>옮길까요?</h1>
      </div>
      <div className='flex flex-col gap-12'>
        <div className='flex flex-col text-gray-500'>
          <div className='flex justify-between'>
            <p>출금계좌</p>
            <p className='text-black'>내 통장</p>
          </div>
          <div className='flex justify-between'>
            <p>입금계좌</p>
            <p className='text-black'>{accountNumber}</p>
          </div>
        </div>
        <div>
          <AchromaticButton
            className='w-full px-5 h-14 text-xl'
            onClick={handleTransfer}
          >
            옮기기
          </AchromaticButton>
        </div>
      </div>
    </div>
  );
}
