<template>
	<USeparator :label="form.title" class="mt-3 mb-3" />

	<UCard :ui="form?.ui" :variant="form?.variant">
		<div class="grid grid-cols-12 gap-1">
			<LnInput v-for="(field, key) in form.fields" :key="key" :model-value="field" />

			<template v-if="form?.forms">
				<div v-for="(fForm, key) in form.forms" :key="key" class="col-span-12">
					<LnForm :key="key" :model-value="fForm" />
				</div>
			</template>
		</div>

		<template v-if="$slots['lnFooter']" #footer>
			<slot name="lnFooter" />
		</template>
	</UCard>
</template>

<script setup lang="ts">
const form = defineModel<LnForm>({ required: true })

const formData = computed(() => useLnForm.getValue(form.value))

defineExpose({
	formData,
})
</script>
