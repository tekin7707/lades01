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