import { Card } from '@/app/ui/molecule/card/card';
import Image from 'next/image';
import IconPlus from '../../assets/img/icon-plus-circle.svg';
import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import Link from 'next/link';
import Header from '@/app/ui/components/header';

export default function CommunityRegister() {
  return (
    <div className='flex flex-col'>
      <Header title='뒤로가기' link='/'/>
      <div className='p-5 flex flex-col gap-8'>
      
      <Link href={'/community-register/form'}>
        <Card className='h-40 flex justify-center items-center'>
          <Image src={IconPlus} alt='추가버튼' className='w-10' />
        </Card>
      </Link>
      <Link href={'/community-register/form'}>
        <AchromaticButton className='h-10 w-full'>
          모임 통장 추가하기
        </AchromaticButton>
      </Link>
    </div>
    </div>
    
  );
}
