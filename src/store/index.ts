import { createStore } from "vuex";

export default createStore({
  state: {
    token: localStorage.getItem("wipon_cabinet_token") || null,
  },
  mutations: {
    setToken(state, payload) {
      localStorage.setItem("wipon_cabinet_token", payload);
      state.token = payload;
    },

    clearToken(state) {
      localStorage.removeItem("wipon_cabinet_token");
      state.token = null;
    },
  },
  actions: {
    logout({ commit }) {
      commit("clearToken");
    },
  },
  modules: {},
});
