import { GetterTree } from 'vuex';
import { State } from './State';

export interface Getters {
    userFullname: string;
    userId: number;
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
    }
};