import Config from '../../app.config.js';
import appCache from '../app.service.cache.js';
import axios from 'axios';

const categoriesService = {
	getCategories() {
		return new Promise((resolve, reject) => {
			try {
				const path = `/categories`;
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
			setTimeout(function() {
				console.log('categories.service/getCategories hanging');
				reject('categories.service/getCategories hanging');
			}, 3000);
		});
	}
};

export default categoriesService;
