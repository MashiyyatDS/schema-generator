<template>
	<UCard :ui="{ body: 'p-2 flex justify-between' }" class="rounded mb-1">
		<span class="text-sm">{{ convertStringCases(fieldName).regular }}: </span>

		<template v-if="select.dropdown.type === 'object'">
			<span class="text-sm text-green-400 font-bold">{{ selectedItems }}</span>
		</template>

		<span v-else class="text-sm text-green-400 font-bold">{{ selectedItems }}</span>
	</UCard>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ select: LnInputSelect; fieldName: string }>(), {})

const selectedItems = computed(() => {
	if (props.select.dropdown.type === 'object') {
		const labelKey = props.select.dropdown.labelKey

		const trueValue = props.select.dropdown?.trueValue

		return Array.isArray(trueValue) ? trueValue.map((item) => item[labelKey]) : trueValue
	} else {
		return props.select.value
	}
})
</script>
