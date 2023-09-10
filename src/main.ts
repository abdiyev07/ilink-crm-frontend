import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SetupCalendar } from "v-calendar";
import { maska } from "maska";
import "@/assets/style/base/bootstrap-reboot.css";
import "@/assets/style/app.scss";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options.js";

const app = createApp(App)
  .use(Quasar, quasarUserOptions)
  .use(store)
  .use(router);
app.use(SetupCalendar, {});
app.directive("mask", maska);
app.mount("#app");
