import Config from '../app.config.js';
import request from 'axios';
import localforage from 'localforage';

const cacheService = {
	store: '',
	isBrowser: typeof window !== 'undefined',
	cacheResponse: (path, cacheTime, response, resolve, reject) => {
		cacheService.store.setItem(path, {
			data: response.data,
			headers: response.headers
		});

		cacheService.store
			.getItem(path)
			.then(response => resolve(response))
			.catch(error => reject(error));
	},
	networkFirstStrategy: (path, cacheTime) => {
		return new Promise((resolve, reject) => {
			request
				.get(path)
				.then(response => {
					// Response returned, cache it and return it
					if (response && response.status && response.status === 200) {
						if (cacheService.isBrowser) {
							cacheService.cacheResponse(path, cacheTime, response, resolve, reject);
						}
						resolve(response);
					} else {
						if (cacheService.isBrowser) {
							cacheService.store
								.getItem(path)
								.then(response => resolve(response))
								.catch(error => reject(error));
						} else {
							reject();
						}
					}
				})
				.catch(error => {
					if (cacheService.isBrowser) {
						cacheService.store
							.getItem(path)
							.then(response => resolve(response))
							.catch(error => reject(error));
					} else {
						reject(error);
					}
				});
		});
	},
	get: function(path) {
		// path = Config.wpDomain + path

		return new Promise((resolve, reject) => {
			cacheService.isBrowser = typeof window !== 'undefined';

			if (cacheService.isBrowser) {
				cacheService.store = localforage.createInstance({
					name: Config.loadDbName
				});
			}

			cacheService
				.networkFirstStrategy(path)
				.then(response => {
					resolve(response || '');
				})
				.catch(error => {
					if (cacheService.isBrowse && error.response.status === 401) {
						window.location = '/login';
					}
					reject(error);
				});
			setTimeout(function() {
				console.log('app.service/get hanging');
				reject('app.service/get hanging');
			}, 3000);
		});
	}
};

export default cacheService;
