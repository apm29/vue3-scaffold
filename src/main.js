import { createApp } from "vue";
import vuetify from "@/plugins/vuetify";
import "@/utils/remote/remoteConfig";
import router from "@/router/router";
import store from "@/store";
import App from "@/App.vue";
import "@/index.css";
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");

if (import.meta.env.MODE === "development") {
  import("@/mock");
}

console.log(import.meta.env);
