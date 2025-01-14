import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";

interface MemberDetailDilogProps{
  id: string,
}

export async function MemberDetailDilog({id}: MemberDetailDilogProps){
  // TODO: Member update 요청

  console.log(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="참여 인원">
        <div className="p-5 text-center">
        </div>
      </DialogContent>
    </Dialog>
  )
}