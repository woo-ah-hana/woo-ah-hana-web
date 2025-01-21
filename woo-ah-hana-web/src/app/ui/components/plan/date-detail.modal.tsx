"use client";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/ui/molecule/dialog/dialog";
import Form from "../../molecule/form/form-index";
import { updatePlanDate } from "@/app/business/plan/plan-update.service";

interface DateDetailDilogProps {
  id: string;
}

export function DateDetailDilog({
  id,
}: DateDetailDilogProps) {
  // TODO: FormData 활용해서 날짜 업데이트 api 요청

  console.log(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={"ghost"} className="text-slate-600">
          수정
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent title="모임일정 변경">
        <div className="p-5 text-center">
          <Form id={"update-date"} action={updatePlanDate} failMessageControl={"alert"}>
            <div className="grid grid-cols-1 text-lg text-slate-500">
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3">시작 일:</div>
                <input type="date" id="start-date" className="border-none"/>
              </div>
              <div className="grid grid-cols-[2fr_4fr]">
                <div className="text-left p-3">종료 일:</div>
                <input type="date" id="start-date" className="border-none"/>
              </div>
            </div>
            <div className="mt-7">
              <Form.SubmitButton
                label="수정하기"
                position="center"
              ></Form.SubmitButton>
            </div>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
