import RecapCarousel from '@/app/ui/components/recap/carousel';
import Header from '@/app/ui/components/header';

export default function Recap() {
  return (
    <div className='h-full flex flex-col bg-[#bed0fc]'>
      <Header title='모임 결산' link='/home' />
      <RecapCarousel/>
    </div>
  );
}