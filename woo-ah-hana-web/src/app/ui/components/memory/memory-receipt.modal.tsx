import AchromaticButton from '../../atom/button/achromatic-button';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from '../../molecule/dialog/dialog';
import { DialogClose } from '@radix-ui/react-dialog';
import { MemoryReceiptDetail } from './memory-receipt-detail';
import { GetPlanReceiptDto, LogDataType } from '@/app/business/memory/memory';
import { getPlanReceipt } from '@/app/business/memory/memory.service';
import { PlanReceipt } from '@/app/business/memory/receipt';

interface MemoryReceiptModalProps {
    planId: string;
}

export default async function MemoryReceiptModal({ planId }: MemoryReceiptModalProps) {
    const response = await getPlanReceipt(planId);
    const receiptData = response.isSuccess? (response.data as PlanReceipt): (PlanReceipt.create([]) as PlanReceipt);

    //  // 입출금내역 임시 데이터
    //  const logs: LogDataType[] = [
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "IN",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "IN",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "OUT",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "IN",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "OUT",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "IN",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    //     {
    //         tran_date: "2025-01-10",
    //         tran_time: "09:10",
    //         inout_type: "OUT",
    //         tran_type: "TRANSFER",
    //         print_content: "Test Transfer 1",
    //         tran_amt: "1000",
    //         after_balance_amt: "9000",
    //         branch_name: "Branch1"
    //     },
    // ];

    return (
        <Dialog>
            <DialogTrigger asChild>
                <AchromaticButton className='w-full'>영수증</AchromaticButton>
            </DialogTrigger>
            <DialogContent className='p-6'>
                <div className='flex flex-col gap-4'>
                    <div className='flex justify-between'>
                        <div className='text-lg font-semibold'>영수증</div>
                        <DialogClose>
                            <div className='w-full flex justify-end'>
                                닫기
                            </div>
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
                            <div className='font-semibold'>{receiptData.getTotalAmt()}</div>
                        </div>
                        <div className="flex justify-between w-full">
                            <div>인당 소비 금액</div>
                            <div className='font-semibold'>{receiptData.getPerAmt()}</div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}