import { boot } from 'quasar/wrappers'
import { useQuasar } from "quasar"

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router, store }) => {
  
  app.config.globalProperties.$notification = (type, msg, timeout = 6000) => {
    let spinner = false;
    let color;
    let icon;
    let progress = true;

    switch (type) {
      case "success":
        color = "green-7";
        icon = "fas fa-check-circle";
        break;
      case "failed":
        color = "red-9";
        icon = "fas fa-times-circle";
        break;
      case "progress":
        spinner = true;
        color = "yellow-9";
        timeout = 0;
        progress = false;
        break;
    }

    return app.config.globalProperties.$q.notify({
      progress: progress,
      spinner: spinner,
      classes: "notify",
      position: "top-right",
      message: msg,
      color: color,
      timeout: timeout,
      icon: icon,
      //group: 'group', //force to delete previous msg
      actions: [{ label: "Close", color: "white", handler: () => {} }],
    });
  };

})
