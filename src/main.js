import { createApp } from "vue";
import vuetify from "@/plugins/vuetify";
import router from "@/router/router";
import App from "@/App.vue";
import "@/index.css";
const app = createApp(App);
app.use(vuetify);
app.use(router);

app.mount("#app");
