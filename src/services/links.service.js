import Config from "../app.config.js";
import appCache from "../app.service.cache.js";

const linksService = {
  cacheRequest(path, cacheTime) {
    return new Promise((resolve, reject) => {
      appCache
        .get(path, cacheTime)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getLinks(categoryId, page, order = "desc") {
    return new Promise((resolve, reject) => {
      let path = `links?category=${categoryId}&page=${page}&order=${order}`;
      linksService
        .cacheRequest(path, 0)
        .then(response => {
          const totalPages = response.data.totalPages || 0;
          const responseData = {
            links: response.data.links,
            totalPages: totalPages
          };
          resolve(responseData);
        })
        .catch(error => reject(error));
    });
  }
};

export default linksService;
