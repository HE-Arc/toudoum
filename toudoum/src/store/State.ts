import { IUser } from "@/models/IUser";

/**
 * Vuex class to dispose a typed State
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface State
 */
export interface State {
    avatar: string;
    isUserLogged: boolean;
    user: IUser | null;
    isDrawerExpanded: boolean;
    avatarTimestamp: number;
}