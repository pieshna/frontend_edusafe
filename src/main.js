import { createApp } from "vue";
import StoragePlugin from "vue-web-storage"
import App from "./App.vue";
import store from "./store";
import router from "./router";
import VueAxios from "vue-axios";
import axios from "axios";

createApp(App)
.use(StoragePlugin,{
  drivers:['session','local']
})
  .use(router)
  .use(router)
  .use(store)
  .mount("#app");
