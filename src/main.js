import { createApp } from "vue";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import "./index.css";
const app = createApp(App);
app.use(vuetify);

app.mount("#app");
