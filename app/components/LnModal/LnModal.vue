<template>
	<UModal :close="{ onClick: () => emit('close', false) }" v-bind="modal.attributes">
		<template #body>
			<UStepper ref="stepper" :items="items" size="xs" class="w-full" disabled>
				<template #content="{ item }">
					<LnForm v-if="modal?.form && item.title === modal?.form.title" v-model="modal.form" />

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

					<template v-if="modal?.preview && item?.title === modal?.preview?.title && modal?.form">
						<LnFormPreview :form="modal.form" :preview="modal.preview" />
					</template>
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

const props = withDefaults(defineProps<{ callback?: (response: any) => void }>(), {})
const modal = defineModel<LnModal>({ required: true })
const emit = defineEmits<{ close: [boolean] }>()
const stepper = useTemplateRef('stepper')

const uploads = ref([])

const items = computed((): StepperItem[] => [
	...(modal.value?.form ? [{ title: modal.value.form.title, description: modal.value.form.description, icon: 'material-symbols:add-notes' }] : []),
	...(modal.value?.uploader ? [{ title: 'Uploader', description: 'File attachments', icon: 'material-symbols:upload-file-rounded' }] : []),
	...(modal.value?.preview ? [modal.value.preview] : []),
])

async function validateForm() {
	if (props.callback) {
		props.callback({
			uploads: uploads.value,
			...(modal.value?.form ? useLnForm.getValue(modal.value.form) : {}),
		})
	}
}
</script>
