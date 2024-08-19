import Vue from 'vue';
import Vuex from 'vuex';
import { authModule } from './authModule';
import { requestsModule } from './requestsModule';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth: authModule,
    requests: requestsModule
  },
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    increment({ commit }) {
      commit('increment');
    },
  },
});
