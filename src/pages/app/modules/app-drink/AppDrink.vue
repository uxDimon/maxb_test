<script setup lang="ts">
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import { getApi } from "@/pages/app/helpersApp";
import type { Drink } from "./interfaceAppDrink";
import { useAppDrink } from "./storesAppDrink";

// router
const route = useRoute(),
	routeName = computed(() => String(route.name));

// store
const store = useAppDrink();

const getApiDrink = () => {
	if (route.name && !store.drink?.[routeName.value]) {
		getApi<{ drinks: Drink[] }>(routeName.value).then((response) => {
			console.log(response);

			if (response) {
				// Из за того что api возвращает массив с результатом поиска
				// Нахожу точное совпадение уже на клиенте, не знаю нужно это или нет
				// Просто работаю с тем api что есть
				store.drink[routeName.value] =
					response.drinks.find((i) => {
						const name = routeName.value[0].toUpperCase() + routeName.value.slice(1);
						return i.strDrink === name;
					}) || null;

				if (store.drink[routeName.value]) {
					// Ингредиенты очень странно сделаны
					// Эта функция попытка сделать их нормальными (но над ней ещё можно поработать)
					store.careerIngredients(routeName.value);
				}

				console.log(store.drink);
			}
		});
	}
};

getApiDrink();

watch(
	() => route.name,
	() => {
		getApiDrink();
	}
);

const drinkItem = computed(() => store.drink[routeName.value]);
</script>

<template>
	<div v-if="drinkItem" class="drink">
		<img v-if="drinkItem.strDrinkThumb" :src="drinkItem.strDrinkThumb" :alt="drinkItem.strDrink" />

		<div class="info">
			<h1 class="title">{{ drinkItem.strDrink }}</h1>
			<ul>
				<li>
					{{ drinkItem.strCategory }}
				</li>
				<li>
					{{ drinkItem.strAlcoholic }}
				</li>
				<li>
					{{ drinkItem.strGlass }}
				</li>
			</ul>

			<h3>Instructions:</h3>
			<p>{{ drinkItem.strInstructions }}</p>

			<h3>List of ingredients:</h3>
			<table>
				<tr v-for="item in drinkItem.ingredients" :key="item.name">
					<td>{{ item.name }}</td>
					<td>{{ item.measure }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
