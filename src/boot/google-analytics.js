import { boot } from 'quasar/wrappers'
import VueGtag from "vue-gtag";

// https://matteo-gabriele.gitbook.io/vue-gtag/v/next/
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  
  if (process.env.ENV != "local") {
    /*app.use(VueGtag, {
      property: {
        id: "GG-D1B6V8LGPL",
        params: {
          send_page_view: true,
        }
      }
    });*/
    console.log("Google boot");
    app.use(VueGtag, {
      config: { 
        id: process.env.GA_MEASUREMENT_ID,
        params: {
          send_page_view: true,
        }
      }
    });
  }
})
