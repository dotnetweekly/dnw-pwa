import linksService from '../../services/links.service';
import defaultState from './defaultState';
import * as calendarHelper from '../../helpers/calendar';

const actions = {
	getLinks({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			linksService
				.getLinks(params)
				.then((response) => {
					if (state) {
						Object.assign(state, {}, defaultState);
					}
					state.links = response.links;
					state.filter.category = params.category ? params.category : '';
					state.filter.date = params.date;
					resolve();
				})
				.catch((error) => reject(error));
		});
	},
	setFilterCategory({ commit, state }, category) {
		state.filter.category = category;
	}
};

export default actions;
