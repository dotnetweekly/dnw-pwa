import axios from 'axios';
import authService from '../../services/auth.service';
import defaultState from './defaultState';
import router from '../../router';

const actions = {
	setLatestPath({ commit, state }, latestPath) {
		state.latestPath = latestPath;
	},
	logout(context) {
		context.commit('logout');
	},
	login(context, credentials) {
		return new Promise((resolve, reject) => {
			try {
				authService
					.login(credentials)
					.then(response => {
						context.commit('login', response.data);

						resolve();
					})
					.catch(response => {
						reject(response);
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	},
	getCount({ context, state }) {
		try {
			axios.get('/user/count').then(response => {
				if (response && response.data && response.data.data) {
					state.subscribers = response.data.data;
				}
			});
		} catch (error) {
			console.log(error);
			reject(error);
		}
	},
	setLoginStatus({ context, state }, loginStatus) {
		state.isAuthenticated = loginStatus;
	},
	setAuthToken(context, token) {
		context.commit('login', token);
	}
};

export default actions;
