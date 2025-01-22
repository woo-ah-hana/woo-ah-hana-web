import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import AccountAuthModal from '@/app/ui/components/account/account-auth.modal';
import Header from '@/app/ui/components/header';
import { FormTextInput } from '@/app/ui/molecule/form/form-textinput';

export default function AccountRegisterForm() {
  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[22px]'>
          <div className='leading-8'>
            하나은행
            <br />
            <span className='font-semibold'>모임 계좌번호</span>를 입력해주세요
          </div>
          <TextInput variant={'default'} placeholder='&#39; - &#39; 없이 입력하세요' />
          <TextInput variant={'secondary'} placeholder='&#39; - &#39; 없이 입력하세요' />
        </div>
        {/* <AccountAuthModal /> */}
        <AchromaticButton variant={'outline'} className='h-12 text-xl w-full'>
          계좌 인증하기
        </AchromaticButton>
      </div>
    </div>
  );
}
