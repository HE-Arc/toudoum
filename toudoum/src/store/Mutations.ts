import { IUser } from '@/models/IUser';
import { Mutation, CommitOptions } from 'vuex';
import { State } from './State';

export type Mutations = "LOGIN" | "LOGOUT" | "DRAWER_TOGGLE";

// Contains all definitions
type MutationsDefinition = {
    [P in Mutations]: Mutation<State>;
}

interface BaseMutationPayloadWithType {
    type: Mutations;
}

/**
 * Interface to create his own commits
 *
 * @author Lucas Fridez <lucas.fridez@he-arc.ch>
 * @export
 * @interface MyCommit
 */
export interface MyCommit {
    (type: Mutations, payload?: any, options?: CommitOptions): void;
    <P extends BaseMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

// All definitions for our own commits
export const mutations: MutationsDefinition = {
    "LOGIN": (state: State, user: IUser) => state.user = user,
    "LOGOUT": (state: State) => state.user = null,
    "DRAWER_TOGGLE": (state: State) => state.isDrawerExpanded = !state.isDrawerExpanded,
};