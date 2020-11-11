import { IUser } from '@/models/IUser';
import { Mutation, CommitOptions } from 'vuex';
import { State } from './State';

export type Mutations = "LOGIN" | "LOGOUT" | "DRAWER_TOGGLE";

type MutationsDefinition = {
    [P in Mutations]: Mutation<State>;
}

interface BaseMutationPayloadWithType {
    type: Mutations;
}

export interface MyCommit {
    (type: Mutations, payload?: any, options?: CommitOptions): void;
    <P extends BaseMutationPayloadWithType>(payloadWithType: P, options?: CommitOptions): void;
}

export const mutations: MutationsDefinition = {
    "LOGIN": (state: State, user: IUser) => state.user = user,
    "LOGOUT": (state: State) => state.user = null,
    "DRAWER_TOGGLE": (state: State) => state.isDrawerExpanded = !state.isDrawerExpanded,
};