// Vue
import Vue from 'vue'
import { PluginObject } from 'vue/types/umd';

// Vuex
import Vuex, { Store, GetterTree, MutationTree, ActionTree } from 'vuex'

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

const getters = {
  getUserId(state: State) {
    return state.userId;
  }
} as GetterTree<State, any>;

const mutations = {
  setUserId(state, payload) {
    state.userId = payload;
  }
} as MutationTree<State>;

const actions = {
  fetchUserId(store) {
    return 1;
  }
} as ActionTree<State, any>;

export default new Vuex.Store({
  state: new State(),
  mutations: mutations,
  getters: getters,
  actions: actions,
  modules: {}
})

