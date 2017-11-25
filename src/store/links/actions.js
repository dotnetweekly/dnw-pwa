import linksService from "../../services/links.service";
import defaultState from "./defaultState";

const actions = {
  getLinks({ commit, state }, params) {
    return new Promise((resolve, reject) => {
      linksService
        .getLinks(params.categoryId, params.page)
        .then(response => {
          if (state) {
            Object.assign(state, {}, defaultState);
          }
          state.links = response.links;
          state.totalPages = response.totalPages;
          console.log(state);
          resolve();
        })
        .catch(error => {
          reject(new Error(error));
        });
    });
  }
};

export default actions;
