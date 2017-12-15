import authService from '../../services/auth.service';
import defaultState from './defaultState';
import router from "../../router"

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
    return;
		if (typeof window === 'undefined' || !router) {
			return;
    }

    if(!state.isAuthenticated){
      router.push("/");

      return;
    }

		if (state.latestPath && state.latestPath != router.route.path) {
      router.push(state.latestPath);

			return;
		}

		router.push('/');
	}
};

export default actions;
