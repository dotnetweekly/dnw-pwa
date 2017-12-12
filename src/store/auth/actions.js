import authService from '../../services/auth.service';
import defaultState from './defaultState';

const actions = {
	setLatestPath({ commit, state }, latestPath) {
		state.latestPath = latestPath;
	},
	logout(context) {
		context.commit('logout');
	},
	login(context, credentials) {
		return new Promise((resolve) => {
			authService
				.login(credentials)
				.then((response) => {
					context.commit('login', response.data);

					resolve();
				})
				.catch(() => {
					if (typeof window !== 'undefined') {
						window.alert('Could not login!');
					}
				});
		});
	},
	setAuthToken(context, token) {
		context.commit('login', token);
	},
	goBack({ context, state }, params) {
		const { router, route } = params;
		if (typeof window === 'undefined' || !router) {
			return;
		}

		if (state.latestPath && state.latestPath != route.path) {
			router.push(state.latestPath);
			return;
		}

		router.push('/profile');
	}
};

export default actions;
