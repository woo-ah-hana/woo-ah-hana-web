import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";

interface LocationsDetailDilogProps{
  id: string,
}

export async function LocationsDetailDilog({id}: LocationsDetailDilogProps){
  // TODO: Member update 요청

  console.log(id);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="모임 장소">
        <div className="p-5 text-center">
        </div>
      </DialogContent>
    </Dialog>
  )
}