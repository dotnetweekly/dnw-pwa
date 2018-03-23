import linksService from "../../services/links.service";

const actions = {
  getLink({ state }, params) {
    if (typeof window !== "undefined") {
      if (state.link.slug && state.firstLoad && !params.authenticated) {
        state.firstLoad = false;
        return;
      }
    }

    return new Promise((resolve, reject) => {
      try {
        state.linkLoading = true;
        linksService
          .getLink(params.slug)
          .then(response => {
            Object.assign(state, {}, { link: response });
            state.linkLoading = false;
            if (typeof window !== "undefined") {
              state.firstLoad = false;
            }
            resolve();
          })
          .catch(error => {
            state.linkLoading = false;
            reject(error);
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  },
  sendComment() {}
};

export default actions;
