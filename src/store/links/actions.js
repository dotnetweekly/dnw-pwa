import linksService from "../../services/links.service";
import Vue from "vue";

const actions = {
  refreshLinks({ commit, state }) {
    actions.getLinks(
      { commit, state },
      {
        category: state.filter.category,
        week: state.filter.dateWeek,
        year: state.filter.dateYear
      }
    );
  },
  getLinks({ state }, params) {
    if (typeof window !== "undefined") {
      if (
        (state.links.length > 0 || state.olderLinks.length > 0) &&
        state.firstLoad &&
        !params.authenticated
      ) {
        state.firstLoad = false;
        return;
      }
    }

    return new Promise((resolve, reject) => {
      try {
        Vue.set(state, "linksAreLoading", true);
        linksService
          .getLinks(params)
          .then(response => {
            state.links = response.links;
            state.olderLinks = response.olderLinks;
            state.filter.category = params.category ? params.category : "";
            state.filter.dateYear = response.year;
            state.filter.dateWeek = response.week;
            state.filter.serverYear = response.serverYear;
            state.filter.serverWeek = response.serverWeek;
            state.filter.serverMonth = response.serverMonth;
            state.filter.serverDate = response.serverDate;
            Vue.set(state, "linksAreLoading", false);
            if (typeof window !== "undefined") {
              state.firstLoad = false;
            }
            resolve();
          })
          .catch(error => {
            Vue.set(state, "linksAreLoading", false);
            console.log("link request error: ", error, params);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  setFilterCategory({ state }, category) {
    state.filter.category = category;
  }
};

export default actions;
