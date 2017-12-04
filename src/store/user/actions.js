import userService from "../../services/user.service";
import defaultState from "./defaultState";

const actions = {
  getProfile({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      userService
        .getProfile()
        .then(response => {
          state.profile = response;
          resolve();
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;