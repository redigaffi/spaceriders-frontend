import { boot } from "quasar/wrappers";
import {useQuasar} from "quasar"
const Buffer = require('buffer/').Buffer 

function parseJwt(token) {
  var base64Payload = token.split('.')[1];
  var payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  const axios = app.config.globalProperties.$axios;
  const $q = app.config.globalProperties.$q;

  axios.interceptors.request.use(
    (config) => {
      const loggedIn = store.getters.loggedIn;
      const jwt = store.getters.jwt;
      
      if (loggedIn) {
        const payload = parseJwt(jwt);
        if (Math.floor(Date.now() / 1000) >= payload.exp) {
          store.commit("destroySession");
          router.push({name: "nouser"});
          $q.loading.hide();
        }

        config.headers.Authorization = `Bearer ${jwt}`;
      }

      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        store.commit("destroySession");
        router.push({name: "nouser"});
        $q.loading.hide();
      }

      return Promise.reject(error);
    }
  );
});
