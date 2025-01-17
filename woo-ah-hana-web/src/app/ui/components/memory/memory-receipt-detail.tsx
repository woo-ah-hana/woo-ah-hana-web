import { PaymentLog } from "@/app/business/memory/receipt";
import React from "react";

export function MemoryReceiptDetail({ logs }: { logs: PaymentLog[] }) {
  const logsView: React.ReactNode[] = logs.map((log, index) => (
    <div
      key={index}
      className="flex flex-col border-b border-gray-300 py-3 gap-2"
    >
      <div className="flex justify-between items-center">
        <div className="text-[15px] font-semibold">{log.print_content}</div>
        <div
          className={`text-[15px] font-semibold ${
            log.inout_type === "OUT" ? "text-gray-500" : "text-blue-500"
          }`}
        >
          {log.inout_type === "OUT" ? "-" : ""}
          {parseInt(log.tran_amt).toLocaleString()}원
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-gray-500">
          {log.tran_date} {log.tran_time}
        </div>
        <div className="text-gray-400 text-[12px]">
          {parseInt(log.after_balance_amt).toLocaleString()}원
        </div>
      </div>
    </div>
  ));

  return <div className="mt-5 text-[13px]">{logsView}</div>;
}
