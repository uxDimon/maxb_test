import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Drink, Ingredients } from "./interfaceAppDrink";

const ingredientsKeys: string[] = [],
	measureKeys: string[] = [];

for (let index = 1; index < 15 + 1; index++) {
	ingredientsKeys.push("strIngredient" + index);
	measureKeys.push("strMeasure" + index);
}

export const useAppDrink = defineStore("counter", () => {
	const drink = reactive<Record<string, Drink | null>>({});

	const careerIngredients = (routeName: string): void => {
		if (drink[routeName]) {
			const ingredients: Ingredients = [];

			ingredientsKeys.forEach((i, index) => {
				// @ts-ignore
				if (drink[routeName]?.[i]) {
					ingredients.push({
						// @ts-ignore
						name: drink[routeName][i],
						// @ts-ignore
						measure: drink[routeName][measureKeys[index]],
					});
				}
			});

			drink[routeName]!.ingredients = ingredients;
		}
	};

	return { drink, careerIngredients };
});
