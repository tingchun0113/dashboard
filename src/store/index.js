import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: "",
    isAuthenticated: false,
    cookie: ""
  },
  mutations: {
    setAuthentication(state, currentUsername) {
      state.username = currentUsername;
      state.isAuthenticated = true;
      state.cookie = localStorage.getItem("cookie");
    },
    revokeAuthentication(state) {
      state.username = "";
      state.isAuthenticated = false;
      state.cookie = "";
      localStorage.removeItem("cookie");
    }
  }
});
