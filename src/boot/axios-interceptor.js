import { boot } from "quasar/wrappers";
import {useQuasar} from "quasar"

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  const axios = app.config.globalProperties.$axios;

  axios.interceptors.request.use(
    (config) => {
      const loggedIn = store.getters.loggedIn;
      const jwt = store.getters.jwt;

      if (loggedIn) {
        config.headers.Authorization = `Bearer ${jwt}`;
      }

      return config;
    },
    function (err) {
      console.log(err);
      return Promise.reject(err);
    }
  );

  //@TODO: Send to landing if no session
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
      if (error.response.status === 401) {
        store.commit("destroySession");
        router.push({name: "nouser"})
      }

      return Promise.reject(error);
    }
  );
});
