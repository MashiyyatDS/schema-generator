<template>
	<URadioGroup v-model="lnInput.value" :items="items" />
</template>

<script setup lang="ts">
import type { LnInputRadioGroup } from '~/types/laranuxt/LnInput'
import type { RadioGroupItem } from '@nuxt/ui'

const lnInput = defineModel<LnInputRadioGroup>({ required: true })

onMounted(async () => {
	if (lnInput.value.server) {
		switch (lnInput.value.server.protocol) {
			case 'rest':
				const items: Record<string, any>[] = await $fetch(lnInput.value.server.endpoint)

				lnInput.value.dropdown.items = items

				break

			case 'graphql':
				break
		}
	}
})

const items = computed(() => {
	if (lnInput.value.dropdown.type === 'object') {
		const labelKey = lnInput.value.dropdown.labelKey
		const valueKey = lnInput.value.dropdown.valueKey
		const descriptionKey = lnInput.value.dropdown?.descriptionKey

		return lnInput.value.dropdown.items?.map((item) => ({
			label: item[labelKey],
			value: item[valueKey],
			...(descriptionKey ? { description: item[descriptionKey] } : {}),
		}))
	}

	return lnInput.value.dropdown.items
}) as ComputedRef<RadioGroupItem[]>
</script>
