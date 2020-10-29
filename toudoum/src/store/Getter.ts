import { GetterTree } from 'vuex';
import { State } from './State';

export const getters = {

    /**
     * Get User Fullname (firstname + name)
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {string} User Fullname 
     */
    getUserFullname(state: State): string {
        return `${state.user?.name} ${state.user?.firstname}`;
    },

    /**
     * Get User Id
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {*}  {number} User Id
     */
    getUserId(state: State): number {
        return state.user?.id ?? -1;
    }

} as GetterTree<State, any>;