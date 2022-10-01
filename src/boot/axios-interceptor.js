import { boot } from "quasar/wrappers";
const Buffer = require("buffer/").Buffer;

function parseJwt(token) {
  var base64Payload = token.split(".")[1];
  var payload = Buffer.from(base64Payload, "base64");
  return JSON.parse(payload.toString());
}

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router, store }) => {
  const axios = app.config.globalProperties.$axios;
  const $q = app.config.globalProperties.$q;
  const $notification = app.config.globalProperties.$notification;

  axios.interceptors.request.use(
    (config) => {
      const loggedIn = store.getters.loggedIn;
      const jwt = store.getters.jwt;

      if (loggedIn) {
        const payload = parseJwt(jwt);
        if (Math.floor(Date.now() / 1000) >= payload.exp) {
          store.commit("destroySession");
          router.push({ name: "nouser" });
          $q.loading.hide();
          $q.notify(
            $notification(
              "failed",
              "Authentication token expired, login again."
            )
          );
        }

        config.headers.Authorization = `Bearer ${jwt}`;

        let hasPlanets = store.getters.activePlanet;
        if (hasPlanets) {
          config.headers["X-Active-Planet"] = store.getters.activePlanet.id;
        }
      }

      return config;
    },
    function (err) {
      alert("something failed, see console for error");
      console.error(err);
      $q.loading.hide();

      return Promise.reject(err);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      try {
        if (error.response !== undefined && error.response.status === 401) {
          store.commit("destroySession");
          const text = error.response.data.message;
          router.push({ name: "nouser" });

          let msg = "";
          if (text !== undefined) {
            msg = text;
          } else {
            msg = "Authentication failed, please try again.";
          }

          $q.loading.hide();
          return Promise.reject(msg);
        }
      } catch (ex) {
        $q.notify($notification("failed", ex));
        console.error(ex);
        $q.loading.hide();
        return;
      }

      $q.loading.hide();

      return Promise.reject(error);
    }
  );
});
