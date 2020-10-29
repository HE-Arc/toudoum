import { IUser } from '@/models/IUser';
import { MutationTree } from "vuex";
import { State } from './State';


export const mutations = {

    /**
     * Log user in Vuex state
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @param {IUser} user user logged in
     */
    logUser(state: State, user: IUser): void {
        state.user = user;
        state.isUserLogged = true;
    }

} as MutationTree<State>;