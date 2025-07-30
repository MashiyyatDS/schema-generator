<template>
	<USelect v-model="lnInputSelect.value" :items="items" v-bind="lnInputSelect.attributes" :default-value="lnInputSelect.defaultValue" />
</template>

<script setup lang="ts">
import type { LnInputSelect } from '~/types/laranuxt/LnInput'

const lnInputSelect = defineModel<LnInputSelect>({ required: true })

onMounted(async () => {
	if (lnInputSelect.value.server) {
		switch (lnInputSelect.value.server.protocol) {
			case 'rest':
				const items: Record<string, any>[] = await $fetch(lnInputSelect.value.server.endpoint)

				lnInputSelect.value.dropdown.items = items

				break

			case 'graphql':
				break
		}
	}
})

const items = computed(() => {
	if (lnInputSelect.value.dropdown.type === 'object') {
		const labelKey = lnInputSelect.value.dropdown.labelKey
		const valueKey = lnInputSelect.value.dropdown.valueKey

		return lnInputSelect.value.dropdown.items?.map((item) => ({
			label: item[labelKey],
			value: item[valueKey],
		}))
	}

	return lnInputSelect.value.dropdown.items
}) as ComputedRef<string[] | { label: string; value: string }[]>
</script>
