<template>
	<UCard
		:ui="{
			body: 'xl:p-2 lg:p-2 md:p-2 sm:p-2 p-2',
			header: 'xl:p-2 lg:p-2 md:p-2 sm:p-2 p-2 text-sm',
		}"
		class="rounded mb-1">
		<template
			v-if="select.dropdown.type === 'object' && 'multiple' in select.attributes"
			#header>
			{{ convertStringCases(fieldName).regular }}
		</template>

		<template v-if="select.dropdown.type === 'object'">
			<div v-if="'multiple' in select.attributes">
				<UBadge
					v-for="(item, key) in selectedItems"
					:key="key"
					class="mr-1 mb-1"
					:label="item" />

				<UCard
					v-if="!selectedItems?.length"
					:ui="{ root: 'flex justify-center p-1 rounded-sm' }"
					variant="subtle">
					<span class="text-sm self-center">
						No {{ convertStringCases(fieldName).regular.toLowerCase() }} selected
					</span>
				</UCard>
			</div>

			<div v-else class="flex justify-between">
				<span>{{ convertStringCases(fieldName).regular }}</span>

				<span class="text-sm text-green-400 font-bold flex justify-between">
					{{ selectedItems?.join(', ') }}
				</span>
			</div>
		</template>

		<div v-else class="flex justify-between">
			<span class="text-sm">{{ convertStringCases(fieldName).regular }}</span>

			<span class="text-sm text-green-400 font-bold">{{ selectedItems }}</span>
		</div>
	</UCard>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		select: LnInputSelect | LnInputSelectMenu | LnInputMenu
		fieldName: string
	}>(),
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
		return modelValue
	}
})
</script>
