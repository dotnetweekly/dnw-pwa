import Config from '../../app.config.js';
import appCache from '../app.service.cache.js';
import axios from 'axios';

const linksService = {
	getNewsletters(filter) {
		return new Promise((resolve, reject) => {
			try {
				const path = `${Config.newsletterDomain}api/v1/newsletters`;
				appCache
					.get(path)
					.then(response => {
						if (!response || !response.data) {
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
				console.log('newsletters.service/getNewsletters hanging');
				reject('newsletters.service/getNewsletters hanging');
			}, 3000);
		});
	}
};

export default linksService;
