import Vue, { PluginObject } from 'vue';
import Vuex, { Store } from 'vuex';
import { ActionFacade, actions } from './Actions';
import { getters } from './Getter';
import { mutations } from './Mutations';
import { State } from './State';
import { TypedStore } from './TypedStore';

// Add typed store to Vue type
declare module "vue/types/vue" {
    interface Vue {
        $typedStore: TypedStore;
    }
}
/**
 * Add typedStore plugin
 */
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

// Instanciate the typed store
const store = new Store<State>({
    state: {
        avatar: "",
        user: null,
        isUserLogged: false,
        avatarTimestamp: Date.now(),
        isDrawerExpanded: true
    },
    getters: getters,
    mutations: mutations,
    actions: actions
}) as TypedStore;
store.actions = new ActionFacade(store);

export default store;