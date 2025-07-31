<template>
	<UCard v-bind="form.attributes" class="m-1">
		<template #header> {{ form.title }} </template>

		<div class="grid grid-cols-12 gap-1">
			<LnInput v-for="(field, key) in form.fields" :key="key" :model-value="field" />
		</div>

		<template v-if="$slots['lnFooter']" #footer>
			<slot name="lnFooter" />
		</template>
	</UCard>

	<template v-if="form?.forms">
		<LnForm v-for="(fForm, key) in form.forms" :key="key" :model-value="fForm" />
	</template>
</template>

<script setup lang="ts">
import type { LnForm } from '~/types/laranuxt/LnForm'

const form = defineModel<LnForm>({ required: true })
</script>
