import axios from "axios";

const service = {
  login(credentials) {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(
            `/auth/login?g-recaptcha-response=${credentials.recaptchaKey}`,
            {
              email: credentials.email,
              password: credentials.password
            }
          )
          .then(response => {
            resolve(response.data);
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

export default service;
