export class RequestResult {
    status: number;
    message: string;
    data?: any;
}

export class User {
    _id :string;
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
    _id:string;
    masterId:string;
    name: string;
    caption: string;
    rate : number;
    state:number;
};


/*
olmal� -> Kullan�c� kredisi => oneLadMax * max(ladItemModel.rate) 
*/

export class ladModel{
    _id?:string;
    userId?:string;
    name?: string;
    caption?: string;
    startDate?:Date;
    endDate?:Date;
    ladValue?:number;
    oneLadMin?:number;
    oneLadMax?:number;
    state?:number;
};

export class ladAllModel{
    lad:ladModel;
    ladItems:ladItemModel[];
}

