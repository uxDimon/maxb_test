<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { DRINK_LIST } from "@/pages/app/constsApp";
</script>

<template>
	<nav class="nav">
		<RouterLink v-for="index in DRINK_LIST" :key="index" :to="'/' + index" class="nav-link">{{ index }}</RouterLink>
	</nav>

	<RouterView />
</template>

<style lang="scss">
div#app {
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-column-gap: 16px;

	width: 100%;
	max-width: var(--block-max-width);
	margin: 0 auto;
	padding: 16px;
}

@media screen and (max-width: 820px) {
	div#app {
		grid-template-columns: 1fr;
		gap: 32px;
	}
}
</style>

<style scoped lang="scss">
.nav {
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 6px;
}

.nav-link {
	width: 100%;
	padding: 4px;

	&.router-link-active {
		background: hsl(0, 0%, 30%);
	}
}

@media screen and (max-width: 820px) {
	.nav {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 6px 12px;
	}

	.nav-link {
		width: auto;
	}
}
</style>
