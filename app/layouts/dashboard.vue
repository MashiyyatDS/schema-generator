<template>
	<UApp>
		<UDrawer
			v-model:open="drawer"
			direction="left"
			title="Sidebar"
			description="delossantos.mash@gmail.com"
			class="rounded-none"
			:ui="{
				header: 'h-[50px] p-2 rounded-none',
				body: 'w-[280px] p-1 sidebar-container border-t border-gray-800',
				container: 'p-0 h-screen',
			}"
			:modal="false"
			:handle="false">
			<template #body>
				<UNavigationMenu orientation="vertical" :items="useNavigation" />
			</template>
		</UDrawer>

		<div
			class="h-screen w-screen right-0 absolute transition-all duration-300 ease-in-out"
			:class="drawer ? 'main-screen-toggled' : 'main-screen'">
			<div class="layout-container p-3">
				<UButton label="Open" color="neutral" variant="subtle" @click="drawer = !drawer" />

				<UBreadcrumb :items="breadcrumbItems" />

				<slot />
			</div>
		</div>
	</UApp>
</template>

<script setup lang="ts">
const drawer = ref(true)

const breadcrumbItems = computed(() => {
	const route = useRoute()

	const segments = route.fullPath.split('/').filter(Boolean)

	let accumulatedPath = ''

	return segments.map((segment) => {
		accumulatedPath += `/${segment}`

		return {
			label: convertStringCases(segment).regular,
			to: accumulatedPath,
		}
	})
})
</script>

<style lang="scss">
.sidebar-container {
	height: calc(100vh - 50px);
	overflow: auto;
}

.main-screen {
	width: 100vw;

	&-toggled {
		width: calc(100vw - 280px);
	}
}
</style>
