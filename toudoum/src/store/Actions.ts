import { ActionContext, ActionTree } from 'vuex';
import { State } from './State';

export const actions = {
    fetchUserId(store: ActionContext<State, any>) {
        return 1;
    }
} as ActionTree<State, any>;