import { createApp } from "vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router/router";
import store from "@/store";
import App from "@/App.vue";
import "@/index.css";
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);

app.mount("#app");

if (process.env.NODE_ENV === "development") {
  import("@/mock");
}

console.log(process.env);
