<template>
	<div :class="[lnInput.grid ?? 'col-span-12']">
		<LnInputDefault v-if="lnInput.type === 'input'" :model-value="lnInput" />

		<LnInputSelect v-if="lnInput.type === 'select'" :model-value="lnInput" />

		<LnInputTextArea v-if="lnInput.type === 'textarea'" :model-value="lnInput" />

		<span>{{ lnInput.value }}</span>
	</div>
</template>

<script setup lang="ts">
import type { LnInput } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInput>({ required: true })
</script>
