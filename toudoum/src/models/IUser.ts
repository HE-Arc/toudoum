/**
 * User Interface
 *
 * @author Julien Dos Santos Ferreira <julien.dossantosferreira@he-arc.ch>
 * @export
 * @interface IUser
 * @extends {ObjectConstructor}
 */
export interface IUser extends ObjectConstructor {
    id: number;
    name: string;
    firstname: string;
    email: string;
    password?: string;
    password_confirmation?: string;
    token?: string;
    avatar: string;

}