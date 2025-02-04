"use client";
import { ActivePlan, SearchResult } from "@/app/business/plan/active-plan";
import Form from "../../molecule/form/form-index";
import { FormState } from "../../molecule/form/form-root";
import { ActivePlanDetail } from "./active-plan-detail";
import AchromaticButton from "../../atom/button/achromatic-button";
import { useState } from "react";
import { search } from "@/app/business/search/search.service";
import { loadActivePlan } from "@/app/business/ai/ai.service";
import { convertDate } from "@/app/utils/convert";
import { saveActivePlans } from "@/app/business/plan/active-plan.service";
import { useRouter } from "next/navigation";
import { SttModalWrapper } from "@/app/ui/components/stt/SttModalWrapper";
import { Loading } from "@/app/ui/components/ai/loading";

interface RequestActivePlanForm {
  planId?: string;
  communityId: string;
  startDate: string;
  endDate: string;
  locations: string[];
}

export function RequestActivePlanForm({
  startDate,
  endDate,
  locations,
  planId,
  communityId,
}: RequestActivePlanForm) {
  const [aiData, setAiDate] = useState<ActivePlan[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("");
  const router = useRouter();
  const [sttResult, setSttResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function getActivePlan(
    prevState: FormState,
    formData: FormData
  ): Promise<FormState> {
    try {
      const input = formData.get("request") as string;
      const activePlanSource = await search([input, ...locations]);

      const activePlan = await loadActivePlan(
        activePlanSource.data as SearchResult[],
        convertDate(startDate),
        convertDate(endDate)
      );

      setAiDate(
        activePlan.map((item) => {
          item.planId = planId;
          return item;
        })
      );

      setSelectedDay(activePlan[0].date);
    } catch (error) {
      console.error("AI 요청 실패:", error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: "AI 요청에 실패했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    return {
      isSuccess: true,
      isFailure: false,
      validationError: {},
      message: "",
    };
  }

  async function save() {
    const response = await saveActivePlans(aiData);
    if (response.isSuccess) {
      router.push(`/plan/detail?id=${planId}&community=${communityId}`);
    } else {
      alert("다시 시도해주세요.");
    }
  }

  const ActivePlans = aiData.map((item, index) => {
    if (item.date == selectedDay) {
      return (
        <main key={index}>
          <ActivePlanDetail
            date={item.date}
            schedule={item.schedule}
            time={item.time}
            description={item.description}
            address={item.address}
            link={item.link}
            mapx={item.mapx}
            mapy={item.mapy}
          />
        </main>
      );
    }
  });

  const duplicated: string[] = [];
  const days = aiData
    .map((item) => {
      if (!duplicated.includes(item.date)) {
        duplicated.push(item.date);
        return item.date;
      }
    })
    .filter((item) => item);

  return (
    <main className="flex flex-col gap-3">
      {isLoading && <Loading />}
      {aiData.length == 0 ? (
        <></>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-3 p-3 bg-slate-100 rounded-xl overflow-y-auto h-96">
            <div className="flex flex-row gap-3 justify-center justify-items-center">
              {days.map((item, index) => {
                return (
                  <AchromaticButton
                    className={
                      item === selectedDay
                        ? `bg-slate-100 border-none shadow-none`
                        : `text-gray-700`
                    }
                    key={index}
                    variant={item === selectedDay ? `outline` : `ghost`}
                    onClick={() => {
                      setSelectedDay(item as string);
                    }}
                  >
                    {item?.substring(5)}
                  </AchromaticButton>
                );
              })}
            </div>
            {ActivePlans}
          </div>
          <div className="flex flex-row gap-2">
            <AchromaticButton
              className="w-full"
              variant={`outline`}
              onClick={async () => {
                await save();
              }}
            >
              저장하기
            </AchromaticButton>
          </div>
        </div>
      )}
      <div>
        <Form
          id="request-for-ai"
          action={getActivePlan}
          failMessageControl="alert"
        >
          <div className="grid grid-cols-[9fr_1fr] gap-1">
            {/* TODO: onValueChange 지양 useRef로 변경 */}
            <Form.TextInput
              id="request"
              label=""
              placeholder="예시) 강남역 맛집 추천해줘."
              value={sttResult}
              onValueChange={setSttResult}
            />
            <Form.SubmitButton
              className=" mt-2 h-12"
              label="요청"
              setLoading={setIsLoading}
            />
          </div>
        </Form>
      </div>
      <div className="fixed bottom-5 right-5 flex justify-end rounded">
        <SttModalWrapper onResult={setSttResult} />
      </div>
    </main>
  );
}
