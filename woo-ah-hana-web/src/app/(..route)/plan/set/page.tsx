"use client";

import { Plan } from "@/app/business/plan/plan";
import { usePlanContext } from "@/app/context/plan-context";
import TitleDisplay from "@/app/ui/components/plan/set-title-display";
import { FormState } from "@/app/ui/molecule/form/form-root";
import Form from "@/app/ui/molecule/form/form-index";
import { useRouter } from "next/navigation";
import Header from "@/app/ui/components/header";

export default function SetTitle() {
  const { plan, updatePlan } = usePlanContext();
  const router = useRouter();

  function getTitleValue(prevState: FormState, formData: FormData): FormState {
    const titleData = formData.get("title") as string;

    const updatedPlan = new Plan(
      plan.getId(),
      plan.getCommunityId(),
      titleData,
      plan.startDate,
      plan.endDate,
      plan.category,
      plan.locations,
      plan.memberIds,
      plan.getMemberNames()
    );
    updatePlan(updatedPlan);
    return {
      ...prevState,
      isSuccess: true,
    };
  }

  return (
    <div>
      <Header
        title="모임 일정 생성"
        link={`/plan?id=${plan.getCommunityId()}`}
      />
      <div className="flex flex-col p-6">
        <Form
          id={"title"}
          action={getTitleValue}
          onSuccess={() => {
            router.push(`/plan/set/period`);
          }}
          failMessageControl={"alert"}
        >
          <div className="flex flex-col gap-20 min-h-[calc(100vh-10rem)]">
            <div className="mb-6">
              <TitleDisplay mainTitle="일정 제목을" subTitle="입력해 주세요." />
              <Form.TextInput
                id="title"
                placeholder="ex) 성수 맛집 탐방"
                className="mb-4"
              />
            </div>
          </div>
          <div>
            <Form.SubmitButton
              label="다음"
              className="w-full h-12 flex justify-center items-center bg-wooahMain text-slate-50 shadow-md hover:bg-wooahDeepBlue"
            />
          </div>
        </Form>
      </div>
    </div>
  );
}
