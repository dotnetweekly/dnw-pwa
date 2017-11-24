import Config from "../app.config.js";
import appCache from "../app.service.cache.js";

const linksService = {
  cacheRequest(path, cacheTime) {
    return new Promise((resolve, reject) => {
      appCache
        .get(path, cacheTime)
        .then(response => {
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  getLinks(categoryId, page, order = "desc") {
    return new Promise((resolve, reject) => {
      let path =
        Config.apiDomain +
        `links?category=${categoryId}&page=${page}&order=${order}`;
      this.cacheRequest(path, 0)
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
