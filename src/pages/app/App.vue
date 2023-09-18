<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { DRINK_LIST } from "@/pages/app/constsApp";
</script>

<template>
	<nav>
		<RouterLink v-for="index in DRINK_LIST" :key="index" :to="index">{{ index }}</RouterLink>
	</nav>

	<RouterView />
</template>

<style scoped lang="scss"></style>
