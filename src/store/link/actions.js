import linksService from '../../services/links.service';
import defaultState from './defaultState';

const actions = {
	getLink({ commit, state }, slug) {
		Object.assign(state, {}, defaultState);
		return new Promise((resolve, reject) => {
			linksService
				.getLink(slug)
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
