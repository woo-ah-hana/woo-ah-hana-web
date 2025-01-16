export interface LogDataType {
    tran_date: string;
    tran_time: string;
    inout_type: string;
    tran_type: string;
    print_content: string;
    tran_amt: string;
    after_balance_amt: string;
    branch_name: string;
}

export interface GetPlanReceiptDto {
    records: LogDataType[];
    totalAmt: number;       
    perAmt: number;  
}
