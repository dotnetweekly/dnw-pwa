import Config from "../app.config.js";
import appCache from "../app.service.cache.js";

const userService = {
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
  getProfile() {
    return new Promise((resolve, reject) => {
      let path = `user/profile`;
      userService
        .cacheRequest(path, 0)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => reject(error));
    });
  }
};

export default userService;
