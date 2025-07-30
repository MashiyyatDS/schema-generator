<template>
	<UFormField :label="lnInput.label" :description="lnInput.description">
		<UTextarea v-bind="lnInput.attributes" v-model="lnInput.value" />
	</UFormField>
</template>

<script setup lang="ts">
import type { LnInputTextarea } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInputTextarea>({ required: true })
</script>
