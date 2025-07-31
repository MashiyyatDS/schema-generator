<template>
	<LnForm v-for="(formItem, key) in form.items" :key="key" :model-value="formItem">
		<template #lnFooter>
			<div class="col-span-12 flex justify-center">
				<UTooltip text="Remove">
					<UButton
						icon="material-symbols:delete-outline"
						size="sm"
						class="rounded-full cursor-pointer"
						@click="form.items?.splice(key, 1)" />
				</UTooltip>
			</div>
		</template>
	</LnForm>

	<pre>{{ form.items }}</pre>

	<div class="col-span-12 flex justify-center">
		<UButton label="Add More" size="sm" class="cursor-pointer" @click="appendForm" />
	</div>
</template>

<script setup lang="ts">
const form = defineModel<{ form: LnForm; items?: LnForm[] }>({ required: true })

function appendForm() {
	if (form.value?.items) {
		form.value.items?.push(form.value.form)
	} else {
		form.value.items = []

		form.value.items?.push(form.value.form)
	}

	console.log(form.value.items)
}
</script>
