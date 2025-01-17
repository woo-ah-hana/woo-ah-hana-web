export class Community{
    private id : string;
    private name : string;
    private account_number: string;
    private manager_id : string;
    private fee : number;
    private fee_period: number;
    private credit : number;

    constructor(
        id: string,
        name: string,
        account_number: string,
        manager_id: string,
        fee: number,
        fee_period : number,
        credit: number,
    )
    {
        this.id = id;
        this.name = name;
        this.account_number = account_number;
        this.manager_id = manager_id;
        this.fee = fee;
        this.fee_period = fee_period;
        this.credit = credit;
    }

    public static create(
        id: string,
        name: string,
        account_number: string,
        manager_id: string,
        fee: number,
        fee_period : number,
        credit: number,
    ){
        return new Community(id, name, account_number, manager_id, fee, fee_period, credit);
    }
}