'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import Form from "../../molecule/form/form-index";
import { updatePlanDate } from "@/app/business/plan/plan-update.service";

interface DateDetailDilogProps{
  id: string,
  startDate: string,
  endDate: string
}

export function DateDetailDilog({id, startDate, endDate}: DateDetailDilogProps){
  // TODO: FormData 활용해서 날짜 업데이트 api 요청

  console.log(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="모임일정 날짜">
        <div className="p-5 text-center">
        <div className="text-lg text-slate-500">
          {startDate.substring(3,10)}~{endDate.substring(3,10)}
        </div>
        <Form id={""} action={updatePlanDate} failMessageControl={"alert"}>
          <div className="p-10"></div>
          <div>
            <Form.SubmitButton label="수정하기" position="center"></Form.SubmitButton>
          </div>
        </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}