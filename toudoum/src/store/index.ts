import Vue, { PluginObject } from 'vue';
import Vuex, { Store } from 'vuex';
import { ActionFacade, actions } from './Actions';
import { getters } from './Getter';
import { mutations } from './Mutations';
import { State } from './State';
import { TypedStore } from './TypedStore';

declare module "vue/types/vue" {
    interface Vue {
        $typedStore: TypedStore;
    }
}

const typedStorePlugin: PluginObject<void> = {
    install(VueInstance: typeof Vue) {
        Object.defineProperty(VueInstance.prototype, '$typedStore', {
            get() {
                return this.$store;
            }
        });
    }
};

Vue.use(Vuex);
Vue.use(typedStorePlugin);

const store = new Store<State>({
    state: {
        user: null,
        isUserLogged: false,
        isDrawerExpanded: true
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}) as TypedStore;
store.actions = new ActionFacade(store);

export default store;