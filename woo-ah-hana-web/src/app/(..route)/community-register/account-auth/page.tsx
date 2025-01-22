import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import Header from '@/app/ui/components/header';
import Link from 'next/link';

export default function AccountRegisterForm() {
  return (
    <div className='h-full flex flex-col'>
      <Header title='모임통장 추가하기' link='/community-register/form' />
      <div className='h-full p-10 flex flex-col justify-between'>
        <div className='flex flex-col gap-14 text-[22px]'>
          <div className='leading-8'>
            하나은행
            <br />
            <span className='font-semibold'>모임 계좌번호</span>를 입력해주세요
          </div>
          <TextInput
            variant={'secondary'}
            sizeVariants={'lg'}
            type={'number'}
            placeholder='&#39; - &#39; 없이 입력하세요'
          />
        </div>
        <Link href={'/community-register/account-auth/check'}>
          <AchromaticButton variant={'outline'} className='h-12 text-xl w-full'>
            계좌 인증하기
          </AchromaticButton>
        </Link>
      </div>
    </div>
  );
}
