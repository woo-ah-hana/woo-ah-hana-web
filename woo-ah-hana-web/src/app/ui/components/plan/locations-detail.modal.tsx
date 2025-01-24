'use client'
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import { Dialog, DialogContent, DialogTrigger } from "@/app/ui/molecule/dialog/dialog";
import { useState } from "react";
import { FormState } from "../../molecule/form/form-root";
import Form from "../../molecule/form/form-index";
import { updateLocations } from "@/app/business/plan/plan-update.service";

interface LocationsDetailDilogProps{
  id: string,
  locations: string[]
}

export function LocationsDetailDilog({id, locations}: LocationsDetailDilogProps){
  const [currentLocations, setCurrentLocations] = useState<string[]>(locations);

  function handleAddLocation(prevState: FormState, formData: FormData):FormState{
    try{
      const content = formData.get('location') as string;
      const newLocations = [content, ...currentLocations];
      setCurrentLocations(newLocations);

      return {
        isSuccess: true,
        isFailure: false,
        validationError:{},
        message: "성공했습니다."
      }
    }catch(error){
      console.log(error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError:{},
        message: "업데이트에 실패했습니다."
      }
    } 
  }

  function handleRemoveLocation(deletedLocation: string){
    const newLocations = currentLocations.filter((location)=>{return location!==deletedLocation});
    setCurrentLocations(newLocations);
  }
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton variant={'ghost'} className="text-slate-600">수정</AchromaticButton>
      </DialogTrigger>
      <DialogContent title="모임 장소">
        <div className="p-5 grid grid-cols-1 gap-5">
          <div>
          {currentLocations.map((location, index)=>{
            return (
              <div key={index} className="grid grid-cols-[9fr_1fr]">
                <div className="mt-2">{location}</div>
                <AchromaticButton variant={'ghost'} onClick={()=>{handleRemoveLocation(location)}}>삭제</AchromaticButton>
              </div>
            )
          })}
          </div>
          <div>
            <div className="mb-3">모임 장소 입력하기</div>
            <Form id={"add-location"} action={handleAddLocation} failMessageControl={"alert"}>
              <div className="grid grid-cols-[7fr_3fr]">
                <Form.TextInput id="location" label="" placeholder=""/>
                <Form.SubmitButton className="h-12" label="입력"/>
              </div>
            </Form>
          </div>
          <AchromaticButton onClick={async()=>{
            await updateLocations(id, currentLocations)
            alert('모임 장소가 변경되었습니다!')
            }}>변경하기</AchromaticButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}