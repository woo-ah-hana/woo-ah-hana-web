"use client";

import Image from "next/image";
import ImgParty from "../../../assets/img/party.png";
import { Bar } from "react-chartjs-2";
import { categoryColors, categoryIcons } from "../../atom/category/category";
import TotalPlan from "@/app/assets/img/icon-totalPlan.jpg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useRef, useState } from "react";
import { Card } from "../../molecule/card/card";
import {
  getRecap,
  getRecapPlanInfoDTO,
  getRecapRequestDTO,
  getRecapResponseDTO,
} from "@/app/business/community/community.service";
import { useSearchParams } from "next/navigation";

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

type Props = {
  year: number;
  quarter: number;
};

type FadeInCardProps = {
  children: React.ReactNode;
  className?: string;
};

function FadeInCard({ children, className = "" }: FadeInCardProps) {
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
        isVisible ? "opacity-100 translate-y-0" : ""
      } ${className}`}
    >
      {children}
    </Card>
  );
}

export default function RecapContent({ year, quarter }: Props) {
  const { fromDate, toDate } = QUARTER_DATE_RANGES[quarter](year);
  const searchParams = useSearchParams();
  const communityId = searchParams.get("id");
  const [recapData, setRecapData] = useState<getRecapResponseDTO | null>(null);
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: "소비 금액 (원)",
        data: [] as number[],
        backgroundColor: "rgba(50, 77, 221, 0.8)",
        borderWidth: 0,
        borderRadius: 8,
      },
    ],
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const requestBody: getRecapRequestDTO = {
          communityId: communityId || "",
          fromDate,
          toDate,
        };
        const response = await getRecap(requestBody);

        if (response?.data) {
          setRecapData(response.data);
        } else {
          console.warn("데이터가 비어 있습니다.");
          setRecapData(null);
        }
      } catch (error) {
        console.error("데이터 요청에 실패했습니다.", error);
        setRecapData(null);
      }
    }

    fetchData();
  }, [fromDate, toDate]);

  useEffect(() => {
    if (recapData) {
      const monthLabelsByQuarter: { [key: number]: string[] } = {
        1: ["1월", "2월", "3월"],
        2: ["4월", "5월", "6월"],
        3: ["7월", "8월", "9월"],
        4: ["10월", "11월", "12월"],
      };

      setChartData({
        labels: monthLabelsByQuarter[quarter] || [],
        datasets: [
          {
            label: "소비 금액 (원)",
            data: recapData.monthlyExpenses || [],
            backgroundColor: "rgba(50, 77, 221, 0.8)",
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
      legend: { position: "top" as const, display: false },
      title: { display: false, text: "3개월 소비 금액 비교" },
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
    <div className="flex flex-col w-screen text-xl gap-6 mb-20">
      <div className="flex flex-col gap-10 bg-white p-5 pb-20">
        <div className="text-center font-medium text-2xl mt-10">
          {year}년 {quarter}분기에 함께한 일정
        </div>
        <div className="w-full justify-center flex">
          <Image src={TotalPlan} width={500} alt="" className="rounded-full" />
        </div>
        <div className="text-center text-[28px] font-semibold">
          {recapData?.numberOfPlans}회
        </div>
        <FadeInCard className="py-5 px-8 flex flex-col gap-3">
          {recapData?.planInfoList?.map(
            (plan: getRecapPlanInfoDTO, index: number) => (
              <div key={index} className="flex flex-row items-center">
                <div
                  className={`${
                    categoryColors[plan.category]
                  } rounded-full mr-3`}
                >
                  <Image
                    src={categoryIcons[plan.category]}
                    alt={plan.category}
                    style={{ width: 60 }}
                    height={50}
                    width={50}
                    priority={true}
                    className="p-1"
                  />
                </div>
                {plan.title}
              </div>
            )
          )}
        </FadeInCard>
      </div>

      <div className="flex flex-col gap-10 bg-white w-full justify-center p-5 pb-20">
        <div className="text-center mt-10 font-medium">
          지난 분기보다{" "}
          <span className="text-2xl text-wooahMain font-semibold">
            {recapData?.howMuchSpentThanLastQuarter.toLocaleString()}원
          </span>{" "}
          더 썼어요!
        </div>
        <FadeInCard className="p-8 flex flex-col gap-5">
          <div className="flex justify-between">
            <div>수입</div>
            <div className="text-2xl text-wooahMain font-semibold">
              {recapData?.thisQuarterIncome.toLocaleString()}원
            </div>
          </div>
          <div className="flex justify-between">
            <div>지출</div>
            <div className="text-2xl text-wooahDeepRed font-semibold">
              {recapData?.thisQuarterExpense.toLocaleString()}원
            </div>
          </div>
        </FadeInCard>
      </div>

      <div className="flex flex-col gap-10 p-5 bg-white pb-20">
        <div className="text-center text-xl mt-10 font-medium">
          소비가 가장 많았던 달은
          <br />
          <span className="text-2xl text-wooahMain font-semibold">
            {recapData?.highestMonth}월
          </span>{" "}
          입니다!
        </div>
        <FadeInCard className="py-10 px-1 flex justify-center items-center">
          <Bar data={chartData} options={options} />
        </FadeInCard>
      </div>

      <div className="flex flex-col gap-10 p-5 bg-white pb-20">
        <div className="text-center mt-10 font-medium">
          {recapData?.highestPlanName == undefined ? (
            <div>해당 분기에 여행한 기록이 없어요.</div>
          ) : (
            <div>
              가장 많이 지출한 모임은 <br />
              <span className="text-2xl text-wooahMain font-semibold">
                {recapData?.highestPlanName}
              </span>
              입니다.
            </div>
          )}
        </div>
        {recapData?.highestPlanName == undefined ? (
          ""
        ) : (
          <FadeInCard className="p-8 flex flex-col gap-8 font-medium">
            <div className="flex justify-center">
              <Image
                src={recapData?.imageUrl || ImgParty}
                width={280}
                height={280}
                style={{ width: 280 }}
                alt="모임사진"
              />
            </div>
            <div>
              이 모임에서 지출한 금액은 <br />
              <span className="text-2xl text-wooahMain font-semibold">
                {recapData?.highestPlanExpense.toLocaleString()}원
              </span>
              이에요.
            </div>
          </FadeInCard>
        )}
      </div>
    </div>
  );
}
