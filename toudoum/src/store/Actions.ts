import { IUser } from '@/models/IUser';
import { ActionContext, Store } from 'vuex';
import { State } from './State';
import { TypedStore } from "./TypedStore"

/**
 * Define all possible actions
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @class ActionFacade
 */
export class ActionFacade {

    /**
     * Creates an instance of ActionFacade.
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {TypedStore} store
     */
    constructor(private readonly store: TypedStore) {
    }

    /**
     * logUser action
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @param {IUser} user
     * @return {*} new value
     */
    logUser(user: IUser) {
        return this.store.dispatch("logUser", user);
    }

    /**
     * toggle drawer state
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @return {*} new value
     */
    toggleDrawer() {
        return this.store.dispatch("toggleDrawer");
    }

    /**
     * Log out action
     *
     * @author Lucas Fridez <lucas.fridez@he-arc.ch>
     * @return {*} 
     */
    logout() {
        return this.store.dispatch("logout");
    }
}

type PayloadType<T> = T extends (payload: infer U) => any ? U : never;

type ActionsDefinition = {
    [P in keyof ActionFacade]: (this: Store<State>, injectee: ActionContext<State, State>, payload: PayloadType<ActionFacade[P]>) => Promise<void> | void;
}

export const actions: ActionsDefinition = {
    logUser: (injectee: ActionContext<State, State>, user: IUser) => injectee.commit("LOGIN", user),
    toggleDrawer: (injectee: ActionContext<State, State>) => injectee.commit("DRAWER_TOGGLE"),
    logout: (injectee: ActionContext<State, State>) => injectee.commit("LOGOUT")
};