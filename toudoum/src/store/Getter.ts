import { GetterTree } from 'vuex';
import { State } from './State';

export interface Getters {
    userFullname: string;
    userId: number;
    isLoggedIn: boolean;
    isDrawerExpanded: boolean;
}

type GettersDefinition = {
    [P in keyof Getters]: (state: State, getters: Getters) => Getters[P];
}

export const getters: GettersDefinition = {
    /**
     * Get User Fullname (firstname + name)
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {string} User Fullname 
     */
    userFullname(state: State): string {
        return `${state.user?.name} ${state.user?.firstname}`;
    },

    /**
     * Get User Id
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {*}  {number} User Id
     */
    userId(state: State): number {
        return state.user?.id ?? -1;
    },

    /**
     * logged in user getter
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {*}  {boolean} true if a user is logged in; false otherwise
     */
    isLoggedIn(state: State): boolean {
        return state.user != null;
    },

    isDrawerExpanded(state: State): boolean {
        return state.isDrawerExpanded;
    }


};