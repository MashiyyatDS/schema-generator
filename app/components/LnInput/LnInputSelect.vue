<template>
	<UFormField :label="lnInputSelect.label" :description="lnInputSelect.description">
		<USelect
			v-model="lnInputSelect.value"
			:items="lnInputSelect.dropdown.items"
			:default-value="lnInputSelect.defaultValue"
			v-bind="lnInputSelect.attributes" />
	</UFormField>
</template>

<script setup lang="ts">
import type { LnInputSelect } from '~/types/laranuxt/LnInput'

const lnInputSelect = defineModel<LnInputSelect>({ required: true })
</script>
