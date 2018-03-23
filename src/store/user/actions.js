import userService from "../../services/user.service";
import router from "../../router";

const actions = {
  getProfile({ state }) {
    return new Promise((resolve, reject) => {
      try {
        userService
          .getProfile()
          .then(response => {
            state.profile = response;
            resolve();
          })
          .catch(error => {
            console.log(error);
            router.push("/");
          });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};

export default actions;
