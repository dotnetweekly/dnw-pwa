import linksService from '../../services/links.service';
import defaultState from './defaultState';

const actions = {
	getLink({ commit, state }, params) {

    if (typeof window !== "undefined" ) {
      if (state.link.slug && state.firstLoad && !params.authenticated) {
        state.firstLoad = false;
        return;
      }
    }

		return new Promise((resolve, reject) => {
			linksService
				.getLink(params.slug)
				.then((response) => {
					Object.assign(state, {}, { link: response });
					resolve();
				})
				.catch((error) => reject(error));
		});
  },
  sendComment({ commit, state }, comment) {

  }
};

export default actions;
