import linksService from "../../services/links.service";
import defaultState from "./defaultState";
import * as calendarHelper from "../../helpers/calendar";

const actions = {
  refreshLinks({commit, state}){
    actions.getLinks({ commit, state }, {
      category: state.filter.category,
      week: state.filter.dateWeek,
      year: state.filter.dateYear
    })
  },
  getLinks({ commit, state }, params) {

    if (typeof window !== "undefined" ) {
      console.log(state.firstLoad && !params.authenticated);
      if (state.firstLoad && !params.authenticated) {
        state.firstLoad = false;
        return;
      }
    }

    return new Promise((resolve, reject) => {
      state.linksLoading = true;
      linksService
        .getLinks(params)
        .then(response => {
          state.links = response.links;
          state.olderLinks = response.olderLinks;
          state.filter.category = params.category ? params.category : "";
          state.filter.dateYear = params.year;
          state.filter.dateWeek = params.week;
          state.linksLoading = false;
          resolve();
        })
        .catch(error => {
          state.linksLoading = false;
          console.log("link request error: ", error);
          reject(error);
        });
    });
  },
  setFilterCategory({ commit, state }, category) {
    state.filter.category = category;
  }
};

export default actions;
