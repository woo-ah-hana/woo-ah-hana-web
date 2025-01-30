'use client';

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
import {
  getRecap,
  getRecapRequestDTO,
  getRecapResponseDTO,
} from '@/app/business/community/community.service';
import { useSearchParams } from 'next/navigation';
// import { getRecap, getRecapRequestDTO, getRecapResponseDTO } from '@/api/community';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PeriodDateRange {
  fromDate: string;
  toDate: string;
}

const QUARTER_DATE_RANGES: {
  [key: number]: (year: number) => PeriodDateRange;
} = {
  1: (year) => ({ fromDate: `${year}-01-01`, toDate: `${year}-03-31` }),
  2: (year) => ({ fromDate: `${year}-04-01`, toDate: `${year}-06-30` }),
  3: (year) => ({ fromDate: `${year}-07-01`, toDate: `${year}-09-30` }),
  4: (year) => ({ fromDate: `${year}-10-01`, toDate: `${year}-12-31` }),
};

// async function callGetRecap(fromDate: string, toDate: string) {
//   try {
//     const requestBody: getRecapRequestDTO = {
//       communityId: 'a1f3e12f-979c-4784-a28e-d1bd9da5e71b',
//       fromDate,
//       toDate,
//     };

//     const response = await getRecap(requestBody);

//     if (response.isSuccess) {
//       // const recap: getRecapResponseDTO = response.data;
//       // console.log('Recap Data:', recap);
//       return response.data;
//     } else {
//       console.error('Failed to fetch recap data.');
//     }
//   } catch (error) {
//     console.error('Error fetching recap data:', error);
//   }
//   return null;
// }

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
  });

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
  const { fromDate, toDate } = QUARTER_DATE_RANGES[quarter](year);
  const searchParams = useSearchParams();
  const communityId = searchParams.get('id');
  const [recapData, setRecapData] = useState<getRecapResponseDTO | null>(null);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: '소비 금액 (원)',
        data: [] as number[],
        backgroundColor: 'rgba(50, 77, 221, 0.8)',
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody: getRecapRequestDTO = {
          communityId: communityId || '',
          fromDate,
          toDate,
        };
        const response = await getRecap(requestBody);
  
        if (response?.data) {
          setRecapData(response.data);
        } else {
          console.warn('데이터가 비어 있습니다.');
          setRecapData(null); // 빈 데이터 처리
        }
      } catch (error) {
        console.error('데이터 요청에 실패했습니다.', error);
        setRecapData(null); // 오류 시 초기화 처리
      }
    }
  
    fetchData();
  }, [fromDate, toDate]);
  

  useEffect(() => {
    if (recapData) {
      const monthLabelsByQuarter: { [key: number]: string[] } = {
        1: ['1월', '2월', '3월'],
        2: ['4월', '5월', '6월'],
        3: ['7월', '8월', '9월'],
        4: ['10월', '11월', '12월'],
      };

      setChartData({
        labels: monthLabelsByQuarter[quarter] || [],
        datasets: [
          {
            label: '소비 금액 (원)',
            data: recapData.monthlyExpenses || [], // 동적 데이터 값
            backgroundColor: 'rgba(50, 77, 221, 0.8)',
            borderWidth: 0,
            borderRadius: 8,
          },
        ],
      });
    }
  }, [recapData]);

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
    <div className='flex flex-col w-screen py-5 px-5 text-xl gap-24 mb-20 bg-[#bed0fc]'>
      {/* 첫 번째 카드 */}
      <div className='flex flex-col gap-10'>
        <div className='text-center'>
          {year}년 {quarter}분기에 함께한 일정
        </div>
        <FadeInCard className='py-5 px-8 flex flex-col gap-3'>
          {recapData?.planTitleList?.map((plan: string, index: number) => (
            <div key={index}>
              • {plan}
            </div>
          ))}
          <div className='text-end text-[28px]'>{recapData?.numberOfPlans}회</div>
        </FadeInCard>
      </div>

      {/* 두 번째 카드 */}
      <div className='flex flex-col gap-10'>
        <div className='text-center'>
          지난 분기보다{' '}
          <span className='text-2xl text-wooahMain'>{recapData?.howMuchSpentThanLastQuarter.toLocaleString()}원</span> 더 썼어요!
        </div>
        <FadeInCard className='p-8 flex flex-col gap-5'>
          <div className='flex justify-between'>
            <div>지출</div>
            <div className='text-2xl text-wooahDeepRed'>{recapData?.thisQuarterExpense.toLocaleString()}원</div>

          </div>
          <div className='flex justify-between'>
            <div>수입</div>
            <div className='text-2xl text-wooahMain'>{recapData?.thisQuarterIncome.toLocaleString()}원</div>

          </div>
        </FadeInCard>
      </div>

      {/* 세 번째 카드 */}
      <div className='flex flex-col gap-10'>
        <div className='text-center'>
          소비가 가장 많았던 달은
          <br />
          <span className='text-2xl text-wooahMain'>{recapData?.highestMonth}월</span> 입니다!
        </div>
        <FadeInCard className='py-10 px-1 flex justify-center items-center'>
          <Bar data={chartData} options={options} />

        </FadeInCard>
      </div>

      {/* 네 번째 카드 */}
      <div className='flex flex-col gap-10'>
        <div className='text-center'>
          가장 많이 지출한 모임은
          <br />
          <span className='text-2xl text-wooahMain'>{recapData?.highestPlanName}</span>이에요.
        </div>
        <FadeInCard className='p-8 flex flex-col gap-8'>
          <div className='flex justify-center'>
            <Image src={ImgParty} width={280} alt='모임사진' />
          </div>
          <div>
            이 모임에서 지출한 금액은
            <br />
            <span className='text-2xl text-wooahMain'>{recapData?.highestPlanExpense.toLocaleString()}원</span>이에요.
          </div>
        </FadeInCard>
      </div>
    </div>
  );
}
