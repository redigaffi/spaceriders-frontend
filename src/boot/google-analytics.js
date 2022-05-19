import { boot } from 'quasar/wrappers'
import VueGtag from "vue-gtag-next";

// https://matteo-gabriele.gitbook.io/vue-gtag/v/next/
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  
  if (process.env.ENV != "local") {
    app.use(VueGtag, {
      property: {
        id: process.env.GA_MEASUREMENT_ID,
        params: {
          send_page_view: true,
        }
      }
    });
  }
})