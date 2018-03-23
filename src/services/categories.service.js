import appCache from "../app.service.cache.js";

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
    });
  }
};

export default categoriesService;
