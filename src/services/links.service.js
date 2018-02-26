import Config from "../../app.config.js";
import appCache from "../app.service.cache.js";
import axios from "axios";

const linksService = {
  getLinks(filter) {
    if (!filter.category) {
      filter.category = "";
    }
    return new Promise((resolve, reject) => {
      const path = `/links?category=${filter.category}&week=${filter.week}&year=${filter.year}`;
      appCache
        .get(path)
        .then(response => {
          if (!response || !response.data) {
            reject();
          }
          resolve(response.data.data);
        })
        .catch(error => { console.log(error); reject(error) });
    });
  },
  getLink(slug) {
    return new Promise((resolve, reject) => {
      const path = `/links/${slug}`;
      appCache
        .get(path)
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
