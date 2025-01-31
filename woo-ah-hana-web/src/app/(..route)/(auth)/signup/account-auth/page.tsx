'use client';

import { validateAccount } from '@/app/business/community/community.service';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import { useRouter} from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AccountRegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    bankTranId: '', // 은행 거래 ID
    accountNumber: '',
    bankName: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isBankListOpen, setIsBankListOpen] = useState(false); // 은행 선택 UI 표시 여부


  useEffect(() => {
    setIsFormValid(!!formData.bankTranId && !!formData.accountNumber);
  }, [formData.bankTranId, formData.accountNumber]);

  const handleInputChange = (value: string) => {
    setFormData((prevState) => ({
      ...prevState,
      accountNumber: value,
    }));
  };

  const handleBankSelect = (bankName: string, bankTranId: string) => {
    setFormData((prevState) => ({
      ...prevState,
      bankTranId, // 선택한 은행에 맞는 거래 ID 설정
      bankName,
    }));
    setIsBankListOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const requestBody = {
        bankTranId: formData.bankTranId, // 선택한 은행의 거래 ID 전달
        accountNumber: formData.accountNumber,
      };

      const response = await validateAccount(requestBody);

      if (response.isSuccess) {
        const queryParams = new URLSearchParams({
          bankName: formData.bankName,
          bankTranId: formData.bankTranId,
          accountNumber: formData.accountNumber,
        }).toString();

        router.push(`/signup/account-auth/check?${queryParams}`);
      } else {
        alert('계좌 인증에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
      alert('계좌 인증 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className='h-full flex flex-col'>
      <Header title='회원가입' link='/' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[22px]'>
          <div>
          <span className='font-semibold'>인증계좌의 은행</span>을 선택해주세요
          </div>
          <div className='leading-8'>
            <div 
              className="relative flex w-full min-w-[10rem] items-center border outline-none transition text-gray-6 duration-100 rounded-none border-x-0 border-t-0 border-b-2 focus-within:border-blue-400 py-1 bg-white hover:bg-gray-50 border-gray-2"
              onClick={() => setIsBankListOpen(true)}
            >
              <input
                className="w-full rounded-lg border-none bg-transparent transition duration-100 focus:outline-none focus:ring-0 py-2 text-black-1 text-lg [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none pl-3 pr-3 placeholder:text-gray-6"
                placeholder="은행 선택"
                value={formData.bankName || ''}
                readOnly/>
            </div>
            <br />
            <span className='font-semibold'>모임 계좌번호</span>를 입력해주세요
          </div>
          <TextInput
            variant={'secondary'}
            sizeVariants={'lg'}
            type={'number'}
            placeholder='&#39; - &#39; 없이 입력하세요'
            onValueChange={handleInputChange}
          />
        </div>
        <AchromaticButton
          variant={'outline'}
          className='h-12 text-xl w-full'
          onClick={handleSubmit}
          disabled={!isFormValid}
        >
          계좌 인증하기
        </AchromaticButton>
      </div>


      {/* 은행 선택 모달 */}
      {isBankListOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            
            <h2 className="text-lg font-semibold mb-4">은행 선택</h2>
            <ul className="space-y-2 max-h-80 overflow-y-auto">
              {[
                { name: '하나은행', bankTranId: '001' },
                { name: '농협은행', bankTranId: '002' },
                { name: '우리은행', bankTranId: '003' },
                { name: '신한은행', bankTranId: '004' },
                { name: '기업은행', bankTranId: '005' },
                { name: '카카오뱅크', bankTranId: '006' },
                { name: '토스뱅크', bankTranId: '007' },
                { name: 'KB국민은행', bankTranId: '008' },
                { name: '부산은행', bankTranId: '009' },
                { name: '대구은행', bankTranId: '010' },
                { name: '광주은행', bankTranId: '011' },
                { name: '전북은행', bankTranId: '012' },
                { name: '제주은행', bankTranId: '013' }
              ].map((bank) => (
                <li 
                  key={bank.bankTranId} 
                  className="p-2 border rounded-lg hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleBankSelect(bank.name, bank.bankTranId)}
                >
                  {bank.name}
                </li>
              ))}
            </ul>
            <button 
              className="mt-4 w-full bg-gray-300 py-2 rounded-lg" 
              onClick={() => setIsBankListOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
