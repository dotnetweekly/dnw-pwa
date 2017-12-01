import linksService from '../../services/links.service';
import defaultState from './defaultState';

const actions = {
	getLinks({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			linksService
				.getLinks(params.categoryId, params.page)
				.then((response) => {
					if (state) {
						Object.assign(state, {}, defaultState);
					}
					state.links = response.links;
					state.totalPages = response.totalPages;
					resolve();
				})
				.catch((error) => reject(error));
		});
	},
	setFilterDate({ commit, state }, date) {
		state.filter.date = date;
	}
};

export default actions;
