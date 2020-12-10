export interface IUser extends ObjectConstructor{
    id: number;
    name: string;
    firstname: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    token?: string;

}