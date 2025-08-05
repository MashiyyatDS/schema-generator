<template>
	<USelect
		v-model="select.value"
		:items="items"
		v-bind="select.attributes"
		@update:model-value="$emit('valueChanges')" />
</template>

<script setup lang="ts">
import type { LnInputSelect } from '~/types/laranuxt/LnInput'

defineEmits(['valueChanges'])

const select = defineModel<LnInputSelect>({ required: true })

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
			value: item[valueKey],
		}))
	}

	return select.value.dropdown.items
}) as ComputedRef<string[] | { label: string; value: string }[]>
</script>
