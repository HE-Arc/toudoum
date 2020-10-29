// Vue
import Vue from 'vue'
import { PluginObject } from 'vue/types/umd';

// Vuex
import Vuex, { Store, GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import { actions } from './Actions';
import { getters } from './Getter';
import { mutations } from './Mutations';

// Internal properties
import { State } from "./State"

// Update Vue interface towith typedStore
declare module "vue/types/vue" {
    interface Vue {
        $typedStore: Store<State>;
    }
}

// Define typedStore property in Vuex Store
const typedStorePlugin: PluginObject<void> = {
    install(VueInstance: typeof Vue) {
        Object.defineProperty(VueInstance.prototype, '$typedStore', {
            get() {
                return this.$store;
            }
        });
    }
};

// Use Vuex and Typed Store
Vue.use(Vuex)
Vue.use(typedStorePlugin);

// Export typed Store !
export default new Vuex.Store({
    state: new State(),
    mutations: mutations,
    getters: getters,
    actions: actions,
})

