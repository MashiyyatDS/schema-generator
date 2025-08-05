<template>
	<UCard
		:ui="{ body: 'xl:p-1 lg:p-1 md:p-1 sm:p-1 p-1 flex justify-between' }"
		class="rounded mb-1">
		<span class="text-sm">{{ convertStringCases(fieldName).regular }}: </span>

		<template v-if="select.dropdown.type === 'object'">
			<div v-if="'multiple' in select.attributes" class="flex gap-1">
				<UBadge v-for="(item, key) in selectedItems" :key="key">{{ item }}</UBadge>
			</div>

			<span v-else class="text-sm text-green-400 font-bold">{{
				selectedItems?.join(', ')
			}}</span>
		</template>

		<span v-else class="text-sm text-green-400 font-bold">{{ selectedItems }}</span>
	</UCard>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{ select: LnInputSelect | LnInputSelectMenu; fieldName: string }>(),
	{}
)

const selectedItems = computed(() => {
	const modelValue = useLnInput(props.select).getValue()

	if (!modelValue || (Array.isArray(modelValue) && !modelValue.length)) return []

	if (props.select.dropdown.type === 'object') {
		const valueKey = props.select.dropdown.valueKey

		const labelKey = props.select.dropdown.labelKey

		if (Array.isArray(modelValue)) {
			const isObjectArray = modelValue.every((mValue) => typeof mValue === 'object')

			const items = props.select.dropdown?.items
				?.filter((item) => {
					const modelItems = isObjectArray
						? modelValue.map((mValue) => mValue[valueKey])
						: modelValue

					return typeof item === 'object'
						? modelItems.includes(item[valueKey])
						: modelItems.includes(item)
				})
				.map((item) => (typeof item === 'object' ? item[labelKey] : item))

			return items
		} else {
			const items = props.select.dropdown?.items
				?.filter((item) => {
					if (typeof item === 'object') {
						return typeof modelValue === 'object'
							? modelValue[valueKey] === item[valueKey]
							: modelValue === item[valueKey]
					} else {
						return typeof modelValue === 'object'
							? modelValue[valueKey] === item
							: modelValue === item
					}
				})
				.map((item) => (typeof item === 'object' ? item[labelKey] : item))

			return items
		}
	} else {
		return props.select.value
	}
})
</script>
