import Config from '../../app.config.js';
import appCache from '../app.service.cache.js';
import axios from 'axios';

const userService = {
	getProfile() {
		return new Promise((resolve, reject) => {
			try {
				const path = `/user/profile`;
				appCache
					.get(path)
					.then(response => {
						resolve(response.data.data);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	},
	getHistory({ type, page, username }) {
		return new Promise((resolve, reject) => {
			try {
				const path = `/user/${username}/${type}?page=${page}`;
				appCache
					.get(path)
					.then(response => {
						resolve(response.data.data);
					})
					.catch(error => {
						console.log(error);
						reject(error);
					});
			} catch (error) {
				console.log(error);
				reject(error);
			}
		});
	}
};

export default userService;
