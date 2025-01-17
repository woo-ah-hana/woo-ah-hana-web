import AchromaticButton from "../../atom/button/achromatic-button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../molecule/dialog/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { MemoryReceiptDetail } from "./memory-receipt-detail";
import { getPlanReceipt } from "@/app/business/memory/memory.service";
import { PlanReceipt } from "@/app/business/memory/receipt";

interface MemoryReceiptModalProps {
  planId: string;
}

export default async function MemoryReceiptModal({
  planId,
}: MemoryReceiptModalProps) {
  const response = await getPlanReceipt(planId);
  const receiptData = response.isSuccess
    ? (response.data as PlanReceipt)
    : (PlanReceipt.create([]) as PlanReceipt);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <AchromaticButton className="w-full mt-5 bg-gray-100 shadow-none text-black text-base hover:bg-gray-100">
          영수증 보기
        </AchromaticButton>
      </DialogTrigger>
      <DialogContent className="p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">영수증</div>
            <DialogClose>
              <div className="w-full flex justify-end">닫기</div>
            </DialogClose>
          </div>
          <div
            id="scrollableDiv"
            className="overflow-y-auto max-h-[55vh] border-t border-b border-gray-300 pr-2"
          >
            <MemoryReceiptDetail logs={receiptData.getRecords()} />
          </div>
          <div className="w-full flex flex-col items-start gap-2">
            <div className="flex justify-between w-full">
              <div>전체 소비 금액</div>
              <div className="font-semibold">{receiptData.getTotalAmt()}</div>
            </div>
            <div className="flex justify-between w-full">
              <div>인당 소비 금액</div>
              <div className="font-semibold">{receiptData.getPerAmt()}</div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
