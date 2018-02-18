import axios from "axios";
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
		return new Promise((resolve, reject) => {
			authService
				.login(credentials)
				.then((response) => {
					context.commit('login', response.data);

					resolve();
				})
				.catch((response) => {
					reject(response);
				});
		});
  },
  getCount(state, token) {
    axios.get("/user/count")
    .then(response => {
      state.subscribers = response.data.data;
    })
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
