import linksService from '../../services/links.service';
import defaultState from './defaultState';

const actions = {
	getLink({ commit, state }, params) {
		if (typeof window !== 'undefined') {
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
						if (typeof window !== 'undefined') {
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
	sendComment({ commit, state }, comment) {}
};

export default actions;
