import { IUser } from '@/models/IUser';
import { Mutation, CommitOptions } from 'vuex';
import { State } from './State';

export type Mutations = "LOGIN";

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
    "LOGIN": (state: State, user: IUser) => state.user = user
};