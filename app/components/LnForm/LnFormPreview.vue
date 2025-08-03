<template>
	<UCard v-bind="preview.attributes">
		<template v-if="$slots['title']" #header>
			<slot name="title" />
		</template>

		<template v-if="form?.fields">
			<UCard v-for="(field, key) in form.fields" :key="key" :ui="{ body: 'p-2 flex justify-between' }" class="rounded mb-1">
				<span class="text-sm">{{ convertStringCases(key).regular }}: </span>

				<span class="text-sm text-green-400 font-bold">{{ field.value }}</span>
			</UCard>
		</template>

		<template v-if="form?.forms">
			<LnFormPreview v-for="(fForm, key) in form.forms" :key="key" :form="fForm" :preview="preview" class="mb-1">
				<template #title>{{ fForm.title }}</template>
			</LnFormPreview>
		</template>
	</UCard>
</template>

<script setup lang="ts">
import type { LnFormPreview } from '~/types/laranuxt/LnForm'

withDefaults(defineProps<{ preview: LnFormPreview; form: LnForm }>(), {})
</script>
