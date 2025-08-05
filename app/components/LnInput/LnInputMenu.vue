<template>
	<UInputMenu
		v-model="select.value"
		:items="items"
		v-bind="select.attributes"
		@update:model-value="$emit('valueChanges')"
		@update:search-term="searchItem" />
</template>

<script setup lang="ts">
defineEmits(['valueChanges'])

const select = defineModel<LnInputMenu>({
	required: true,
})

onMounted(async () => {
	if (select.value.server) {
		switch (select.value.server.protocol) {
			case 'rest':
				const items: Record<string, any>[] = await $fetch(select.value.server.endpoint)

				select.value.dropdown.items = items

				break

			case 'graphql':
				break
		}
	}
})

const items = computed(() => {
	if (select.value.dropdown.type === 'object') {
		const labelKey = select.value.dropdown.labelKey
		const valueKey = select.value.dropdown.valueKey

		return select.value.dropdown.items?.map((item) => ({
			label: item[labelKey],
			[valueKey]: item[valueKey],
		}))
	}

	return select.value.dropdown.items
}) as ComputedRef<string[] | { label: string; value: string }[]>

function searchItem(event: string) {
	console.log(event)
}
</script>
