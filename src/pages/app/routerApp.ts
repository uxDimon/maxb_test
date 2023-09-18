import { createRouter, createWebHistory } from "vue-router";
import { DRINK_LIST } from "@/pages/app/constsApp";
import AppDrink from "@/pages/app/modules/app-drink/AppDrink.vue";

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

console.log(routes);

const routerApp = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		...[
			{
				path: "/",
				redirect: `/${DRINK_LIST[0]}`,
			},
		],
		...routes,
	],
});

export default routerApp;
