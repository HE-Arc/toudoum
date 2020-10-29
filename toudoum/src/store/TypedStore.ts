import { Store } from "vuex";
import { ActionFacade } from './Actions';
import { Getters } from "./Getter";
import { MyCommit } from "./Mutations";
import { State } from "./State";

// Define typed Store
export interface TypedStore extends Store<State> {
    getters: Getters;
    commit: MyCommit;
    actions: ActionFacade;
}