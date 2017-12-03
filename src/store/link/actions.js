import linksService from '../../services/links.service';
import defaultState from './defaultState';

const actions = {
	getLink({ commit, state }, slug) {
		Object.assign(state, {}, defaultState);
		return new Promise((resolve, reject) => {
			linksService
				.getLink(slug)
				.then((response) => {
					Object.assign(state, {}, defaultState);
					state.link = response;
					resolve();
				})
				.catch((error) => reject(error));
		});
	}
};

export default actions;
