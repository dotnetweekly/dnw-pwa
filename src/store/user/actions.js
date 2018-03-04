import userService from '../../services/user.service';
import defaultState from './defaultState';
import router from '../../router';

const actions = {
	getProfile({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			try {
				userService
					.getProfile()
					.then(response => {
						state.profile = response;
						resolve();
					})
					.catch(error => {
						router.push('/');
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
			setTimeout(function() {
				console.log('user/actions/getProfile hanging');
				reject('user/actions/getProfile hanging');
			}, 3000);
		});
	}
};

export default actions;
