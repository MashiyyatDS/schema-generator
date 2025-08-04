<template>
	<USelect v-model="select.value" :items="items" v-bind="select.attributes" />
</template>

<script setup lang="ts">
import type { LnInputSelect } from '~/types/laranuxt/LnInput'
import { validate } from 'robust-validator'

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

	assignTruValue()
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

async function assignTruValue() {
	const selectValue = select.value.value

	const items = select.value.dropdown.items ?? []

	const result = await validate(select.value, { value: 'required' })

	if (result.isInvalid || (Array.isArray(selectValue) && !selectValue.length)) return

	if (select.value.dropdown.type === 'object') {
		const keyValue = select.value.dropdown.valueKey

		if (Array.isArray(selectValue)) {
			const trueValue = selectValue.every((value) => typeof value === 'object')
				? selectValue
				: items.filter((item) => selectValue.some((sItem) => (typeof item === 'object' ? item[keyValue] === sItem : sItem === item)))

			select.value.dropdown.trueValue = trueValue
		} else {
			const trueValue =
				typeof selectValue === 'object'
					? [selectValue]
					: items.filter((item) => (typeof item === 'object' && item[keyValue] === selectValue) || item === selectValue)

			select.value.dropdown.trueValue = trueValue
		}
	}
}
</script>
