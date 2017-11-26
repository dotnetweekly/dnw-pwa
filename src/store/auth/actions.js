import authService from "../../services/auth.service";
import defaultState from "./defaultState";

const actions = {
  setLatestPath({ commit, state }, latestPath) {
    state.latestPath = latestPath;
  },
  logout(context) {
    context.commit("logout");
  },
  login(context, credentials) {
    return new Promise(resolve => {
      authService
        .login(credentials)
        .then(response => {
          context.commit("login", response.data);

          resolve();
        })
        .catch(() => {
          if (typeof window !== "undefined") {
            window.alert("Could not login!");
          }
        });
    });
  }
};

export default actions;
