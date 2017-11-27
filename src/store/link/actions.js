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
  },
  getComments({ commit, state }, id) {
    state.comments = [];
    return new Promise((resolve, reject) => {
      linksService
        .getComments(id)
        .then(response => {
          state.comments = response;
          resolve();
        })
        .catch(error => reject(error));
    });
  }
};

export default actions;
