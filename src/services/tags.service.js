import Config from '../../app.config.js';
import appCache from '../app.service.cache.js';
import axios from 'axios';

const tagsService = {
	getTags() {
		return new Promise((resolve, reject) => {
			try {
				const path = `/tags`;
				appCache
					.get(path)
					.then(response => {
						if (!response || !response.data || !response.data.data) {
							reject();
						}
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

export default tagsService;
