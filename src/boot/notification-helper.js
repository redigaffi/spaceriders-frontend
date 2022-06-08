import { boot } from 'quasar/wrappers'
import { useQuasar } from "quasar"

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router, store }) => {
  
  app.config.globalProperties.$notification = (type, msg) => {
    
    
    let timeout = 0;

    switch (type) {
      case "success":
        type =  'positive';
        timeout = 2000;

        break;
      case "failed":
        if (msg instanceof Error) {
          try {
            msg = msg.response.data.message
          } catch(e) {
            msg = "Something unexpected happened..."
          }
        }

        timeout = 2000;
        type = 'negative';
        break;
      case "progress":
        
        timeout = 0;
        type = "ongoing"
        break;
    }
    

    return {
      classes: "notify",
      position: "top-right",
      type: type,
      message: msg,
      timeout: timeout,
      //group: 'group', //force to delete previous msg
      actions: [{ label: "Close", color: "white", handler: () => {} }],
    }
  };

})
