<template>
	<div v-if="!lnInput.hidden" :class="[lnInput.grid ?? 'col-span-12']">
		<UFormField :label="lnInput.label" :description="lnInput.description" :error="lnInput.errors" :hint="lnInput.hint" :help="lnInput.help">
			<LnInputDefault v-if="lnInput.type === 'input'" :model-value="lnInput" />

			<LnInputSelect v-if="lnInput.type === 'select'" :model-value="lnInput" />

			<LnInputTextArea v-if="lnInput.type === 'textarea'" :model-value="lnInput" />

			<LnInputCalendar v-if="lnInput.type === 'calendar-input'" :model-value="lnInput" />

			<LnInputPin v-if="lnInput.type === 'pin'" :model-value="lnInput" />

			<LnInputNumber v-if="lnInput.type === 'input-number'" :model-value="lnInput" />

			<LnInputSwitch v-if="lnInput.type === 'switch'" :model-value="lnInput" />

			<LnInputSlider v-if="lnInput.type === 'slider'" :model-value="lnInput" />
		</UFormField>
	</div>
</template>

<script setup lang="ts">
import type { LnInput } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInput>({ required: true })
</script>
