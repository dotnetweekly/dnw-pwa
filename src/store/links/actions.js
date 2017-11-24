import linksService from "../../services/links.service";
import defaultState from "./defaultState";

const getLinks = ({ commit, state }, params) => {
  return new Promise((resolve, reject) => {
    linksService
      .getLinks(params.categoryId, params.page)
      .then(response => {
        state.links = response.links;
      })
      .catch(error => {
        reject(new Error(error));
      });
  });
};

export { getLinks };
