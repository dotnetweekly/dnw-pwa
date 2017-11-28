import Config from "../app.config.js";
import appCache from "../app.service.cache.js";
import axios from "axios";

const linksService = {
  getLinks(categoryId, page, order = "desc") {
    return new Promise((resolve, reject) => {
      const path = `/links?category=${categoryId}&page=${page}&order=${order}`;
      appCache.get(path, 5000)
        .then(response => {
          if (!response || !response.data) {
            reject();
          }
          const totalPages = response.data.data.totalPages || 0;
          const responseData = {
            links: response.data.data.links,
            totalPages: totalPages
          };
          resolve(responseData);
        })
        .catch(error => reject(error));
    });
  },
  getLink(slug) {
    return new Promise((resolve, reject) => {
      const path = `/links/${slug}`;
      appCache.get(path, 5000)
        .then(response => {
          if (!response || !response.data) {
            reject();
          }
          resolve(response.data.data);
        })
        .catch(error => reject(error));
    });
  }
};

export default linksService;
