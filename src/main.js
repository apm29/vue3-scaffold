import { createApp } from "vue";
import Vant from "@/plugins/vant";
import "@/utils/remote/remoteConfig";
import router from "@/router/router";
import store from "@/store";
import App from "@/App.vue";
import "@/index.css";
import "@mdi/font/css/materialdesignicons.css";
import lazy from "@/utils/lazy/lazy";
const app = createApp(App);
app.use(Vant);
app.use(router);
app.use(store);
app.directive("lazy-load", lazy);
app.mount("#app");

if (import.meta.env.MODE === "development") {
  import("@/mock");
}

console.log(import.meta.env);
