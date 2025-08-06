<template>
	<div
		class="sidebar w-[300px] p-1 h-screen overflow-auto max-h-screen border-r border-r-gray-800">
		<UNavigationMenu orientation="vertical" :items="useNavigation" />
	</div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
