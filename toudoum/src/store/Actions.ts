import { IUser } from '@/models/IUser';
import { ActionContext, Store } from 'vuex';
import { State } from './State';
import { TypedStore } from "./TypedStore"

export class ActionFacade {
    constructor(private readonly store: TypedStore) {
    }
    logUser(user: IUser) {
        return this.store.dispatch("logUser", user);
    }
}

type PayloadType<T> = T extends (payload: infer U) => any ? U : never;

type ActionsDefinition = {
    [P in keyof ActionFacade]: (this: Store<State>, injectee: ActionContext<State, State>, payload: PayloadType<ActionFacade[P]>) => Promise<void> | void;
}

export const actions: ActionsDefinition = {
    logUser: (injectee: ActionContext<State, State>, user: IUser) => injectee.commit("LOGIN", user)
};