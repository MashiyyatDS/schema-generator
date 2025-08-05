<template>
	<div v-if="!lnInput.hidden" :class="[lnInput.grid ?? 'col-span-12']">
		<UFormField
			:label="lnInput.label"
			:description="lnInput.description"
			:error="lnInput.errors"
			:hint="lnInput.hint"
			:help="lnInput.help">
			<UInput
				v-if="lnInput.type === 'input'"
				v-bind="lnInput.attributes"
				v-model="lnInput.value"
				@update:model-value="onValueUpdated" />

			<UTextarea
				v-if="lnInput.type === 'textarea'"
				v-bind="lnInput.attributes"
				v-model="lnInput.value"
				@update:model-value="onValueUpdated" />

			<UPinInput
				v-if="lnInput.type === 'pin'"
				v-model="lnInput.value"
				v-bind="lnInput.attributes"
				@update:model-value="onValueUpdated" />

			<UInputNumber
				v-if="lnInput.type === 'input-number'"
				v-model="lnInput.value"
				v-bind="lnInput.attributes"
				@update:model-value="onValueUpdated" />

			<USwitch
				v-if="lnInput.type === 'switch'"
				v-model="lnInput.value"
				v-bind="lnInput.attributes"
				@update:model-value="onValueUpdated" />

			<USlider
				v-if="lnInput.type === 'slider'"
				v-model="lnInput.value"
				v-bind="lnInput.attributes"
				@update:model-value="onValueUpdated" />

			<LnInputSelect v-if="lnInput.type === 'select'" :model-value="lnInput" />

			<LnInputSelectMenu
				v-if="lnInput.type === 'select-menu'"
				:model-value="lnInput"
				@value-changes="onValueUpdated" />

			<LnInputRadioGroup v-if="lnInput.type === 'radio-group'" :model-value="lnInput" />

			<LnInputCalendar v-if="lnInput.type === 'calendar-input'" :model-value="lnInput" />
		</UFormField>
	</div>
</template>

<script setup lang="ts">
import type { LnInput } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInput>({
	required: true,
})

function onValueUpdated() {
	if (lnInput.value.validateOnChange) useLnInput(lnInput.value).validateValue('field')
}
</script>
