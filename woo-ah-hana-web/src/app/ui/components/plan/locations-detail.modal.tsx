"use client";
import AchromaticButton from "@/app/ui/atom/button/achromatic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/ui/molecule/dialog/dialog";
import { useState } from "react";
import { FormState } from "../../molecule/form/form-root";
import Form from "../../molecule/form/form-index";
import { updateLocations } from "@/app/business/plan/plan-update.service";
import { message } from "antd";
import { PlanDialog } from "@/app/ui/molecule/planDialog/planDialog";

interface LocationsDetailDilogProps {
  id: string;
  locations: string[];
}

export function LocationsDetailDilog({
  id,
  locations,
}: LocationsDetailDilogProps) {
  const [currentLocations, setCurrentLocations] = useState<string[]>(locations);
  const [messageApi, contextHolder] = message.useMessage();

  function handleAddLocation(
    prevState: FormState,
    formData: FormData
  ): FormState {
    try {
      const content = formData.get("location") as string;
      const newLocations = [content, ...currentLocations];
      setCurrentLocations(newLocations);

      return {
        isSuccess: true,
        isFailure: false,
        validationError: {},
        message: "성공했습니다.",
      };
    } catch (error) {
      console.log(error);
      return {
        isSuccess: false,
        isFailure: true,
        validationError: {},
        message: "업데이트에 실패했습니다.",
      };
    }
  }

  function handleRemoveLocation(deletedLocation: string) {
    const newLocations = currentLocations.filter((location) => {
      return location !== deletedLocation;
    });
    setCurrentLocations(newLocations);
  }

  return (
    <Dialog>
      {contextHolder}
      <DialogTrigger asChild>
        <AchromaticButton variant={"ghost"} className="text-slate-600">
          수정
        </AchromaticButton>
      </DialogTrigger>
      <PlanDialog className="rounded-t-2xl">
        <div className="text-start text-xl font-semibold mb-2 pl-3 pr-3">
          모임 장소
        </div>
        <div className="p-5 grid grid-cols-1 gap-5">
          <div className="flex flex-wrap gap-2">
            {currentLocations.map((location, index) => {
              return (
                <div>
                  <div
                    key={index}
                    className="bg-blue-50 text-gray-800 px-4 rounded-full flex items-center"
                  >
                    <span>{location}</span>
                    <AchromaticButton
                      variant={"ghost"}
                      onClick={() => handleRemoveLocation(location)}
                      className="text-gray-500 p-0 text-lg ml-2"
                    >
                      ×
                    </AchromaticButton>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div className="mb-5">
              <div className="mt-3 font-bold mb-1">모임 장소 추가</div>

              <div className="text-xs text-gray-600">
                여러분의 특별한 공간을 추가해 보세요.
              </div>
              <div className="text-xs text-gray-600">
                모임 장소를 추가하면 참석자들과 더 쉽게 공유할 수 있어요.
              </div>
            </div>
            <Form
              id={"add-location"}
              action={handleAddLocation}
              failMessageControl={"alert"}
            >
              <div className="grid grid-cols-[3fr_1fr]">
                <Form.TextInput
                  id="location"
                  label=""
                  placeholder=""
                  className="h-10"
                />
                <Form.SubmitButton
                  className=" bg-white text-wooahMain border border-wooahMain shadow-none h-10 rounded-3xl"
                  label="추가"
                />
              </div>
            </Form>
          </div>
          <AchromaticButton
            onClick={async () => {
              await updateLocations(id, currentLocations);
              messageApi.open({
                type: "success",
                content: "모임 장소 변경에 성공했습니다!",
                duration: 1,
                className: "font-bold",
              });
              setTimeout(() => window.location.reload(), 1000);
            }}
          >
            저장
          </AchromaticButton>
        </div>
      </PlanDialog>
    </Dialog>
  );
}
