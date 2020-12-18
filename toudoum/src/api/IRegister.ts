/**
 * Toudoum API Register Interface
 * Interface to post /auth/signup
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface IRegister
 */
export interface IRegister {
    email: string;
    name: string;
    firstname: string;
    password: string;
    password_confirmation: string;
}