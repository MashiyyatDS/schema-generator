<template>
	<!-- Navbar -->
	<nav class="fixed top-0 z-60 w-full border-b border-gray-800 bg-sky-950 h-[50px]">
		<div class="flex items-center justify-between h-full pl-2 pr-2">
			<div class="flex items-center justify-start rtl:justify-end gap-3">
				<UButton
					icon="material-symbols:menu"
					class="bg-blue-600 cursor-pointer self-center"
					@click="drawer = !drawer" />

				<span class="self-center text-xl"> LaraNuxt </span>
			</div>
			<div class="flex items-center">
				<div class="flex items-center ms-3">
					<!-- Dropdown here... -->
				</div>
			</div>
		</div>
	</nav>

	<!-- Sidebar -->
	<div
		class="sidebar w-[300px] fixed bottom-0 left-0 z-55 h-screen bg-[#0f172b] transition-transform duration-300 border-r border-gray-800"
		:class="{ '-translate-x-full': !drawer }">
		<div class="sidebar-header">
			<span>LaraNuxt</span>
		</div>

		<div class="sidebar-content overflow-auto border-t border-gray-800 p-2">
			<UNavigationMenu orientation="vertical" :items="useNavigation" />
		</div>
	</div>

	<div class="p-4 transition-all duration-300 mt-[50px]" :class="{ 'sm:ml-[300px]': drawer }">
		<div class="p-3 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-800">
			<UBreadcrumb :items="breadcrumbItems" />

			<slot />
		</div>
	</div>
</template>

<script setup lang="ts">
const drawer = ref(false)

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
	height: calc(100vh - 50px);

	&-header {
		height: 50px;
	}

	&-content {
		height: calc(100% - 50px);
	}
}

.main-screen {
	width: 100%;

	&-toggled {
		width: calc(100% - 300px);
	}
}
</style>
