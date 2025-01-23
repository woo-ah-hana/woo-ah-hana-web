import ClosingCarousel from '@/app/ui/components/closing/carousel';
import Header from '@/app/ui/components/header';

export default function Closing() {
  return (
    <div className='h-full flex flex-col bg-[#bed0fc]'>
      <Header title='모임 결산' link='/home' />
      <ClosingCarousel/>
    </div>
  );
}