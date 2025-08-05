<template>
	<UInputMenu
		v-model="select.value"
		:items="select.dropdown.items"
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

function searchItem() {
	//console.log(event)
}
</script>
