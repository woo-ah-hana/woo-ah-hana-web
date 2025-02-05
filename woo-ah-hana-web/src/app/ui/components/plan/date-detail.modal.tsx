"use client";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import {
  Dialog,
  DialogTrigger,
} from "@/app/ui/molecule/dialog/dialog";
import Form from "../../molecule/form/form-index";
import { updatePlanDate } from "@/app/business/plan/plan-update.service";
import { FormSubmitButton } from "../../molecule/form/form-submit-button";
import { message } from "antd";
import { PlanDialog } from "@/app/ui/molecule/planDialog/planDialog";
interface DateDetailDilogProps {
  id: string;
}

export function DateDetailDilog({ id }: DateDetailDilogProps) {
  // TODO: FormData 활용해서 날짜 업데이트 api 요청
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"ghost"} className="text-slate-600">
          수정
        </AchromaticButton>
      </DialogTrigger>
      <PlanDialog className="rounded-t-2xl">
        <div className="pl-3 pr-3 pb-3 text-center">
          <div className="text-start text-xl font-semibold mb-2">
            모임 일정 변경
          </div>
          <Form
            id="updatedate"
            action={updatePlanDate}
            failMessageControl={"alert"}
            onSuccess={() => {
              messageApi.open({
                type: "success",
                content: "일정 변경에 성공했습니다!",
                duration: 1,
                className: "font-bold",
              });
              setTimeout(() => window.location.reload(), 1000);
            }}
          >
            <Form.TextInput
              value={id}
              id="id"
              className="hidden"
              placeholder=""
            />
            <div className="grid grid-cols-1 gap-2 text-lg text-slate-500">
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3 text-base">시작 일:</div>
                <input
                  type="date"
                  name="start-date"
                  id="start-date"
                  className="border-none text-base"
                />
              </div>
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3 text-base">종료 일:</div>
                <input
                  type="date"
                  name="end-date"
                  id="end-date"
                  className="border-none text-base"
                />
              </div>
            </div>
            <div className="mt-7">
              <FormSubmitButton
                label="저장"
                position="center"
                className="w-11/12 rounded-xl"
              />
            </div>
          </Form>
        </div>
      </PlanDialog>
    </Dialog>
  );
}
