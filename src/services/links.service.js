import appCache from "../app.service.cache.js";

const linksService = {
  getLinks(filter) {
    if (!filter.category) {
      filter.category = "";
    }
    return new Promise((resolve, reject) => {
      try {
        const path = `/links?category=${filter.category}&week=${
          filter.week
        }&year=${filter.year}`;
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
    });
  },
  getLink(slug) {
    return new Promise((resolve, reject) => {
      try {
        const path = `/links/${slug}`;
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
    });
  }
};

export default linksService;
