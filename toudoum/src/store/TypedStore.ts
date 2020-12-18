import { Store } from "vuex";
import { ActionFacade } from './Actions';
import { Getters } from "./Getter";
import { MyCommit } from "./Mutations";
import { State } from "./State";

/**
 * Awesome Typed Store  
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface TypedStore
 * @extends {Store<State>}
 */
export interface TypedStore extends Store<State> {
    getters: Getters;
    commit: MyCommit;
    actions: ActionFacade;
}