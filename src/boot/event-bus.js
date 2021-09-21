import { boot } from 'quasar/wrappers'
import mitt from 'mitt'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot( ({app, router, store}) => {
  // https://github.com/developit/mitt
  app.config.globalProperties.$eventBus = mitt();
});
