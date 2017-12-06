import newslettersService from '../../services/newsletters.service';
import defaultState from './defaultState';

const actions = {
	getNewsletters({ commit, state }, params) {
		if (state.newsletters.length > 0) {
			return;
		}
		return new Promise((resolve, reject) => {
			newslettersService
				.getNewsletters(params)
				.then((response) => {
					if (state) {
						Object.assign(state, {}, defaultState);
					}
					console.log(response);
					state.newsletters = response;
					resolve();
				})
				.catch((error) => reject(error));
		});
	}
};

export default actions;
