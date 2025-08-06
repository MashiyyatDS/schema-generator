<template>
	<UApp>
		<div class="flex">
			<SideBar />

			<UBreadcrumb :items="breadcrumbItems" />

			<slot />
		</div>
	</UApp>
</template>

<script setup lang="ts">
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
