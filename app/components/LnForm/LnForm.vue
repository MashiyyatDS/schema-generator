<template>
	<UCard :ui="form?.ui" :variant="form?.variant">
		<template #header> {{ form.title }} </template>

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
</script>
