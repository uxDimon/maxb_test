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
	<main v-if="drinkItem" class="drink">
		<div class="info">
			<h1 class="title">{{ drinkItem.strDrink }}</h1>
			<ul class="list">
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

			<h3 class="subtitle">Instructions:</h3>
			<p>{{ drinkItem.strInstructions }}</p>

			<h3 class="subtitle">List of ingredients:</h3>
			<table>
				<tr v-for="item in drinkItem.ingredients" :key="item.name">
					<td>{{ item.name }}</td>
					<td>{{ item.measure }}</td>
				</tr>
			</table>
		</div>

		<img
			v-if="drinkItem.strDrinkThumb"
			:src="drinkItem.strDrinkThumb"
			:alt="drinkItem.strDrink"
			loading="lazy"
			class="img"
			width="300"
			height="300"
		/>
	</main>

	<div v-else class="spinner">
		<svg width="44" height="44" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
				opacity=".25"
				fill="#fff"
			/>
			<path
				d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
				class="spinner_ajPY"
				fill="#fff"
			/>
		</svg>
	</div>
</template>

<style>
.spinner_ajPY {
	transform-origin: center;
	animation: spinner_AtaB 0.75s infinite linear;
}
@keyframes spinner_AtaB {
	100% {
		transform: rotate(360deg);
	}
}
</style>

<style scoped lang="scss">
.drink {
	display: grid;
	grid-template-columns: 1fr 300px;
	grid-column-gap: 16px;
}

.title {
	margin: 0 0 12px;
}

.subtitle {
	margin: 16px 0 8px;
}

.list {
	margin-bottom: 20px;
}

.img {
	width: 100%;
	height: auto;
	max-height: 400px;
	object-fit: cover;
}

.spinner {
	display: flex;
	align-items: center;
	justify-content: center;
}

@media screen and (max-width: 640px) {
	.drink {
		grid-template-columns: 1fr;
		gap: 32px;
	}

	.img {
		grid-row-start: 1;
	}
}
</style>
