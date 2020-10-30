export interface IUser {
    id: number;
    name: string;
    firstname: string;
    email: string;
    password?: string;
    token?: string;
}