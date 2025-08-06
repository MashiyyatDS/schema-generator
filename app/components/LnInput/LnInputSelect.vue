<template>
	<USkeleton v-if="pending" class="h-8 w-full" />

	<USelect
		v-else
		v-model="select.value"
		:loading="pending"
		:disabled="pending"
		:items="select.dropdown.items"
		v-bind="select.attributes" />
</template>

<script setup lang="ts">
defineEmits(['valueChanges'])

const select = defineModel<LnInputSelect>({ required: true })

onMounted(async () => {
	if (select.value.server) {
		switch (select.value.server.protocol) {
			case 'rest':
				execute()

				break

			case 'graphql':
				break
		}
	}
})

const { pending, execute } = useAsyncData(
	`get-items-${generateRandom6DigitNumber()}`,
	async () => {
		if (select.value?.server && select.value?.server.protocol === 'rest') {
			const items: Record<string, any>[] = await $fetch(select.value.server.endpoint)

			select.value.dropdown.items = items

			return items
		}

		return []
	},
	{
		immediate: false,
	}
)
</script>
