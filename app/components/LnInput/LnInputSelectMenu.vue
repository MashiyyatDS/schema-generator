<template>
	<USkeleton v-if="pending" class="h-8 w-full" />

	<USelectMenu
		v-else
		v-model="select.value"
		:loading="pending"
		:disabled="pending"
		:items="select.dropdown.items"
		v-bind="select.attributes"
		@update:model-value="$emit('valueChanges')"
		@update:search-term="searchItem" />
</template>

<script setup lang="ts">
import type { LnInputSelectMenu } from '~/types/laranuxt/LnInput'

defineEmits(['valueChanges'])

const select = defineModel<LnInputSelectMenu>({
	required: true,
})

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
function searchItem(event: string) {
	console.log(event)
}
</script>
