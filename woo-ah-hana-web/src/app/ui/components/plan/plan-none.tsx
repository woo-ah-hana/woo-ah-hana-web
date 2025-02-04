import Image from 'next/image';
import IconNone from '../../../assets/img/icon-none.png';

export default function PlanNone(){
    return (
        <div className='h-[70vh] flex flex-col justify-center items-center gap-3 text-xl font-semibold'>
          <Image src={IconNone} alt='noneIcon' style={{width:'120px', height:'120px'}}/>
          <div>모임 일정이 없습니다.</div>
          <div>일정을 세우고 멤버들과 공유해보세요!</div>
        </div>
      );
}