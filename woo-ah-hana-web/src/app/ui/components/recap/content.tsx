import Image from 'next/image';
import ImgParty from '../../../assets/img/party.png';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useRef, useState } from 'react';
import { Card } from '../../molecule/card/card';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type Props = {
  year: number;
  quarter: number;
};

type FadeInCardProps = {
  children: React.ReactNode;
  className?: string;
};

function FadeInCard({ children, className = '' }: FadeInCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.7 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    
    <Card
    
    ref={cardRef}
    className={`transition-all duration-1000 ease-in-out opacity-0 translate-y-5 ${
      isVisible ? 'opacity-100 translate-y-0' : ''
    } ${className}`}
  >
    {children}
    
  </Card>
  );
}

export default function RecapContent({ year, quarter }: Props) {
  const data = {
    labels: ['1월', '2월', '3월'],
    datasets: [
      {
        label: '소비 금액 (원)',
        data: [700000, 350000, 1050000],
        backgroundColor: 'rgba(50, 77, 221, 0.8)',
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, display: false },
      title: { display: false, text: '3개월 소비 금액 비교' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: number | string) {
            return `${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-screen py-5 px-5 text-xl gap-24 mb-20 bg-[#bed0fc]">
      {/* 첫 번째 카드 */}
      <div className="flex flex-col gap-10">
        <div className="text-center">{year}년 {quarter}분기에 함께한 일정</div>
        <FadeInCard className="py-5 px-8 flex flex-col gap-3">
          <div>• 강릉여행</div>
          <div>• 강남역 저녁 식사</div>
          <div className="text-end text-[28px]">2회</div>
        </FadeInCard>
      </div>

      {/* 두 번째 카드 */}
      <div className="flex flex-col gap-10">
        <div className="text-center">
          지난 분기보다 <span className="text-2xl text-wooahMain">500,000원</span> 더 썼어요!
        </div>
        <FadeInCard className="p-8 flex flex-col gap-5">
          <div className="flex justify-between">
            <div>지출</div>
            <div className="text-2xl text-wooahDeepRed">1,000,000원</div>
          </div>
          <div className="flex justify-between">
            <div>수입</div>
            <div className="text-2xl text-wooahMain">2,000,000원</div>
          </div>
        </FadeInCard>
      </div>

      {/* 세 번째 카드 */}
      <div className="flex flex-col gap-10">
        <div className="text-center">
          소비가 가장 많았던 달은<br />
          <span className="text-2xl text-wooahMain">2월</span> 입니다!
        </div>
        <FadeInCard className="py-10 px-1 flex justify-center items-center">
          <Bar data={data} options={options} />
        </FadeInCard>
      </div>

      {/* 네 번째 카드 */}
      <div className="flex flex-col gap-10">
        <div className="text-center">
          가장 많이 지출한 모임은<br />
          <span className="text-2xl text-wooahMain">강릉 여행</span>이에요.
        </div>
        <FadeInCard className="p-8 flex flex-col gap-8">
          <div className="flex justify-center">
            <Image src={ImgParty} width={280} alt="모임사진" />
          </div>
          <div>
            이 모임에서 지출한 금액은<br />
            <span className="text-2xl text-wooahMain">34,567,136원</span>이에요.
          </div>
        </FadeInCard>
      </div>
    </div>
  );
}
