<template>
	<UModal :close="{ onClick: () => emit('close', false) }" v-bind="modal.attributes">
		<template #body>
			<UStepper ref="stepper" :items="items" size="xs" class="w-full" disabled>
				<template #content="{ item }">
					<LnForm v-if="modal?.form && item.title === 'Form'" v-model="modal.form" />

					<div v-if="item?.title === 'Uploader'" class="grid grid-cols-12 gap-2 mt-1">
						<div class="col-span-12">
							<UFileUpload
								v-model="uploads"
								label="Drop your image here"
								description="SVG, PNG, JPG or GIF (max. 2MB)"
								class="w-full min-h-48"
								multiple />
						</div>
					</div>

					<div v-if="item?.title === 'Confirmation'" class="grid grid-cols-12 gap-2 mt-1">
						<div v-if="modal?.form" class="col-span-12">
							<pre>{{ useLnForm.getValue(modal.form) }}</pre>
						</div>
					</div>
				</template>
			</UStepper>
		</template>

		<template #footer>
			<div class="flex justify-between w-full">
				<UButton :disabled="!stepper?.hasPrev" label="Previous" @click="stepper?.prev()" />

				<UButton v-if="stepper?.hasNext" label="Next" @click="stepper?.next()" />

				<UButton v-if="!stepper?.hasNext" label="Confirm" @click="validateForm" />
			</div>
		</template>
	</UModal>
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const modal = defineModel<LnModal>({ required: true })
const emit = defineEmits<{ close: [boolean] }>()
const stepper = useTemplateRef('stepper')

const items = computed((): StepperItem[] => [
	...(modal.value?.form ? [{ title: 'Form', description: 'Details and information', icon: 'material-symbols:add-notes' }] : []),
	...(modal.value?.uploader ? [{ title: 'Uploader', description: 'File attachments', icon: 'material-symbols:upload-file-rounded' }] : []),
	...(modal.value?.confirmation ? [modal.value.confirmation] : []),
])

const uploads = ref([])

async function validateForm() {
	if (modal.value?.form) {
		const validated = await useLnForm.validate(modal.value.form)

		if (validated) {
			console.log(useLnForm.getValue(modal.value.form))
		}
	}
}
</script>
