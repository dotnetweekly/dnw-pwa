import Config from "./app.config.js";
import request from "axios";
import localforage from "localforage";

const cacheService = {
  store: "",
  storeCacheTime: "",
  currentTime: "",
  isBrowser: false,
  networkRequest: (path, cacheTime, resolve, reject) => {
    cacheService
      .networkFirstStrategy(path, cacheTime)
      .then(response => resolve(response))
      .catch(err => reject(err));
  },
  cacheResponse: (path, cacheTime, response, resolve, reject) => {
    cacheService.storeCacheTime
      .setItem(path,
      cacheService.currentTime + cacheTime
      );

    cacheService.store
      .setItem(path, {
        data: response.data,
        headers: response.headers
      });

    cacheService.store
      .getItem(path)
      .then(response => resolve(response))
      .catch(err => reject(err));
  },
  networkFirstStrategy: (path, cacheTime) => {
    return new Promise((resolve, reject) => {
      request
        .get(path)
        .then(response => {
          // Response returned, cache it and return it
          if (response && response.status && response.status === 200) {
            if (cacheService.isBrowser) {
              cacheService.cacheResponse(path, cacheTime, response, resolve, reject);
            }
            resolve(response);
            return;
          }

          reject(response);
          return;
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  offlineFirstStrategy: (path, cacheTime) => {
    return new Promise((resolve, reject) => {
      cacheService.storeCacheTime
        .getItem(path)
        .then(function (timeLastCached) {
          // Cache has expired
          if (timeLastCached < cacheService.currentTime) {
            cacheService.networkRequest(path, cacheTime, resolve, reject);

            return;
          }

          cacheService.store
            .getItem(path)
            .then(response => {
              if (response) {
                // Is in cache perfect!
                resolve(response);
              } else {
                // Doesn't exist in cache try network
                cacheService.networkRequest(path, cacheTime, resolve, reject);

                return;
              }
            })
            .catch(error => {
              console.log(error);
              // Doesn't exist in cache try network
              cacheService.networkRequest(path, cacheTime, resolve, reject);

              return;
            });
        })
        .catch(error => {
          console.log(error);
          // Doesn't exist in cache timeouts try network
          cacheService.networkRequest(path, cacheTime, resolve, reject);

          return;
        });
    });
  },
  get: function (path, cacheTime) {
    // path = Config.wpDomain + path

    return new Promise((resolve, reject) => {
      cacheService.currentTime = Math.floor(Date.now() / 1000);
      cacheService.isBrowser = typeof window !== "undefined";

      if (cacheService.isBrowser) {
        cacheService.store = localforage.createInstance({
          name: Config.loadDbName
        });
        cacheService.storeCacheTime = localforage.createInstance({
          name: Config.loadDbName + "_cacheTime"
        });
      }

      if (!cacheService.isBrowser || !cacheTime || cacheTime === 0) {
        cacheService
          .networkFirstStrategy(path, 0)
          .then(response => {
            resolve(response || "");
          })
          .catch(err => {
            if (cacheService.isBrowse && err.response.status === 401) {
              window.location = "/login";
            }
            reject(err);
          });
      } else {
        cacheService
          .offlineFirstStrategy(path, cacheTime)
          .then(response => {
            resolve(response || "");
          })
          .catch(err => reject(err));
      }
    });
  }
};

export default cacheService;
