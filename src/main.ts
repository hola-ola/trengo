import "./assets/styles/main.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(
  faEnvelope,
  faPhone,
  faWhatsapp,
  faCheck,
  faPlus,
  faTrash,
  faGripVertical,
  faChevronUp,
  faChevronDown,
  faComment,
  faChevronRight,
  faChevronLeft,
);

const app = createApp(App);
app.use(createPinia());
app.use(ElementPlus);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
