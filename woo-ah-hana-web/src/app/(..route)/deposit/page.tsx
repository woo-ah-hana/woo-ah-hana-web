import AchromaticButton from '@/app/ui/atom/button/achromatic-button';
import TextInput from '@/app/ui/atom/text-input/text-input';
import { Card, CardContent, CardHeader } from '@/app/ui/molecule/card';

export default function Deposit() {
  return (
    <div className='p-10 h-screen flex flex-col justify-between'>
      <div className='flex flex-col gap-12'>
        <Card className='border-none shadow-none mt-20'>
          <h1 className='text-2xl'>
            하나은행 통장<span className='text-lg'>에서</span>
          </h1>
          <p className='text-base'>1000원</p>
        </Card>
        <Card className='border-none shadow-none'>
          <h1 className='text-2xl'>
            토스뱅크 통장<span className='text-lg'>으로</span>
          </h1>
          <p className='text-base'>계좌번호 21490112345678</p>
        </Card>
        <Card className='border-none shadow-none'>
          <TextInput
            placeholder='얼마나 옮길까요?'
            className='border-none w-full'
          ></TextInput>
        </Card>
      </div>
      <div>
        <AchromaticButton className='w-full px-5 h-14 text-xl'>확인</AchromaticButton>
      </div>
    </div>
  );
}
