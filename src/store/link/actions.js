import linksService from "../../services/links.service";
import defaultState from "./defaultState";

const actions = {
  getLink({ commit, state }, slug) {
    return new Promise((resolve, reject) => {
      linksService
        .getLink(slug)
        .then(response => {
          state.link = response;
          resolve();
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;
