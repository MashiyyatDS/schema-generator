<template>
	<div class="flex overflow-hidden">
		<UCard
			class="transform transition-transform duration-300 ease-in-out"
			:class="sidebarClass"
			:ui="{
				root: 'w-[300px] h-screen rounded-none sidebar',
				header: 'lg:p-1 md:p-1 sm:p-1 p-2 sidebar-header h-[50px]',
				body: 'lg:p-1 md:p-1 sm:p-1 p-1 sidebar-container',
			}">
			<template #header>
				<div class="flex items-center h-full">
					<span>Sidebar</span>
				</div>
			</template>

			<UNavigationMenu orientation="vertical" :items="useNavigation" />
		</UCard>

		<!-- Main Content -->
		<div class="flex-1 transition-all duration-300 ease-in-out">
			<UButton label="Toggle" @click="drawer = !drawer" />

			<UBreadcrumb :items="breadcrumbItems" />

			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const drawer = ref(true)

const sidebarClass = computed(() => ({
	'-translate-x-full': !drawer.value,
	'translate-x-0': drawer.value,
	hidden: !drawer.value,
}))

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
.sidebar {
	height: 100vh;

	&-container {
		height: calc(100vh - 50px);
		overflow: auto;
	}
}

.main-screen {
	width: 100%;

	&-toggled {
		width: calc(100% - 300px);
	}
}
</style>
