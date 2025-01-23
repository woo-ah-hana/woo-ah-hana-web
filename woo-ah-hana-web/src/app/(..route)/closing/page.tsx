import Carousel from '@/app/ui/components/closing/carousel';
import ClosingContent from '@/app/ui/components/closing/content';
import Header from '@/app/ui/components/header';

export default function Closing() {
  return (
    <div className='h-full flex flex-col'>
      <Header title='모임 결산' link='/home' />
      <Carousel>
        <ClosingContent/>
      </Carousel>
    </div>
  );
}
