import Config from "../app.config.js";
import appCache from "../app.service.cache.js";
import axios from "axios";

const categoriesService = {
  getCategories() {
    return new Promise((resolve, reject) => {
      const path = `/categories`;
      appCache
        .get(path, 60 * 1000)
        .then(response => {
          if (!response || !response.data || !response.data.data) {
            reject();
          }
          resolve(response.data.data);
        })
        .catch(error => reject(error));
    });
  }
};

export default categoriesService;
