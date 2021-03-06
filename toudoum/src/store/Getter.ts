import { State } from './State';

/**
 * All getter to type
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface Getters
 */
export interface Getters {
    avatar: string;
    userFullname: string;
    userEmail: string;
    userId: number;
    isLoggedIn: boolean;
    avatarTimestamp: number;
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
     * Get last timestamp for image (actualize directly)
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state
     * @return {*}  {number}
     */
    avatarTimestamp(state: State): number {
        return state.avatarTimestamp;
    },

    /**
     * Get avatar url
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state
     * @return {*}  {string} avatar url
     */
    avatar(state: State): string {
        return state.avatar;
    },

    /**
     * Get User email
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {string} User email 
     */
    userEmail(state: State): string {
        return state.user?.email ?? "";
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

    /**
     * Get Drawer expanded state
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {State} state Vuex State
     * @return {boolean} true is user expanded: false otherwise 
     */
    isDrawerExpanded(state: State): boolean {
        return state.isDrawerExpanded;
    }
};