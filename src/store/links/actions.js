import linksService from "../../services/links.service";
import defaultState from "./defaultState";
import * as calendarHelper from "../../helpers/calendar";

const actions = {
  refreshLinks({commit, state}){
    actions.getLinks({ commit, state }, {
      category: state.filter.category,
      date: state.filter.date,
      week: state.filter.dateWeek,
      year: state.filter.dateYear,
      hardRefresh: true
    })
  },
  getLinks({ commit, state }, params) {
    if (
      state.filter.category === params.category &&
      state.filter.date === params.date &&
      !params.hardRefresh
    ) {
      return;
    }

    return new Promise((resolve, reject) => {
      linksService
        .getLinks(params)
        .then(response => {
          if (state) {
            Object.assign(state, {}, defaultState);
          }
          state.links = response.links;
          state.olderLinks = response.olderLinks;
          state.filter.category = params.category ? params.category : "";
          state.filter.date = params.date;
          state.filter.dateYear = params.year;
          state.filter.dateWeek = params.week;
          resolve();
        })
        .catch(error => reject(error));
    });
  },
  setFilterCategory({ commit, state }, category) {
    state.filter.category = category;
  }
};

export default actions;
