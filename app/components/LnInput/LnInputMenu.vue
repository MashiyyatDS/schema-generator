<template>
	<UInputMenu
		v-model="select.value"
		:items="select.dropdown.items"
		v-bind="select.attributes"
		:loading="pending"
		:disabled="pending"
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
				execute()

				break

			case 'graphql':
				break
		}
	}
})

const { pending, execute } = useAsyncData(
	'get-items',
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

function searchItem() {
	//console.log(event)
}
</script>
