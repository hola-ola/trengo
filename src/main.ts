import "./assets/styles/main.scss";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@/libraries/fontAwesome";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
