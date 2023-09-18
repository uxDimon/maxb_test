import "./main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "@/pages/app/App.vue";
import routerApp from "@/pages/app/routerApp";

const appEl = document.querySelector("#app");
if (appEl) {
	const app = createApp(App);
	app.use(createPinia());
	app.use(routerApp);
	app.mount(appEl);
}
