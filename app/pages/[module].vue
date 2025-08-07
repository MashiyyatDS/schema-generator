<template>
	<div>
		<h1>{{ convertStringCases(`${currentRoute}`).regular }}</h1>
	</div>
</template>

<script setup lang="ts">
const currentRoute = useRoute().params['module']

definePageMeta({ layout: 'dashboard-layout' })

useHead({
	title: 'Module',
})
</script>
