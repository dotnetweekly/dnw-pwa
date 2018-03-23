import newslettersService from "../../services/newsletters.service";
import defaultState from "./defaultState";

const actions = {
  getNewsletters({ commit, state }, params) {
    if (state.newsletters.length > 0) {
      return;
    }
    return new Promise((resolve, reject) => {
      try {
        newslettersService
          .getNewsletters(params)
          .then(response => {
            if (state) {
              Object.assign(state, {}, defaultState);
            }
            state.newsletters = response;
            resolve();
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};

export default actions;
