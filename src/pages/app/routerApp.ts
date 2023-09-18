import { createRouter, createWebHistory } from "vue-router";
import { DRINK_LIST } from "@/pages/app/constsApp";
import AppDrink from "@/pages/app/modules/app-drink/AppDrink.vue";
import NotFound from "@/pages/app/modules/not-found/NotFound.vue";

const routes: {
	path: string;
	name: string;
	component: any;
}[] = [];

DRINK_LIST.forEach((key) => {
	routes.push({
		path: `/${key}`,
		name: key,
		component: AppDrink,
	});
});

const routerApp = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...[
			{
				path: "/",
				redirect: `/${DRINK_LIST[0]}`,
			},
			{
				path: "/:pathMatch(.*)*",
				name: "NotFound",
				component: NotFound,
			},
		],
		...routes,
	],
});

export default routerApp;
