export class RequestResult {
    status: number;
    message: string;
    data?: any;
}

export class User {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    state?: number;
};


export class ladActionModel{
    master: string;
    actionDate: string;
    item : number;
    ladValue : number;
    ladTotal : number;
    state:number;
};


export class ladItemModel{
    name: string;
    caption: string;
    rate : number;
    state:number;
};


/*
olmal� -> Kullan�c� kredisi => oneLadMax * max(ladItemModel.rate) 
*/

export class ladModel{
    name: string;
    caption: string;
    startDate:Date;
    endDate:Date;
    ladValue:number;
    oneLadMin:number;
    oneLadMax:number;
    state:number;
};

