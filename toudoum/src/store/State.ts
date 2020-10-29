import { IUser } from "@/models/IUser";

/**
 * Vuex class to dispose a typed State
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @class State
 */
export class State {
    isUserLogged: boolean = false;
    user: IUser | null = null;
}