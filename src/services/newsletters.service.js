import Config from '../app.config.js';
import appCache from '../app.service.cache.js';
import axios from 'axios';

const linksService = {
	getNewsletters(filter) {
		return new Promise((resolve, reject) => {
			const path = `/newsletters`;
			appCache
				.get(path, 24 * 60 * 60 * 1000)
				.then((response) => {
					if (!response || !response.data) {
						reject();
					}
					resolve(response.data.data);
				})
				.catch((error) => reject(error));
		});
	}
};

export default linksService;
