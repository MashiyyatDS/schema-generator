<template>
	<div class="flex flex-col justify-center m-5">
		<h1 class="self-center text-[20px] mb-10 font-bold">Dynamic Model Schema Generator</h1>

		<div class="w-full max-w-[1280px] self-center">
			<UStepper ref="stepper" :items="items">
				<template #content="{ item }">
					<ModelAndFields v-if="item.title === 'Model & Fields'" ref="modelAndFields" :model-value="modelFields" />

					<DatabaseMigrations v-if="item.title === 'Database Migrations'" ref="databaseMigrations" :model-value="modelFields" />
					<!--<CodeViewer v-if="item.title === 'Database Migrations'" :content="phpContent" lang="typescript" />-->

					<UButton label="Generate Files" size="xl" @click="startGenerate" />
				</template>
			</UStepper>

			<div class="flex gap-2 justify-between mt-4">
				<UButton leading-icon="i-lucide-arrow-left" :disabled="!stepper?.hasPrev" @click="stepper?.prev()"> Prev </UButton>

				<UButton trailing-icon="i-lucide-arrow-right" :disabled="!stepper?.hasNext" @click="stepper?.next()"> Next </UButton>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items: StepperItem[] = [
	{
		title: 'Model & Fields',
		description: 'Enter your model name',
		icon: 'i-lucide-house',
	},
	{
		title: 'Database Migrations',
		description: 'Set your model schema',
		icon: 'i-lucide-truck',
	},
	{
		title: 'GraphQL & GQL Schema',
		description: 'Set your model schema',
		icon: 'i-lucide-truck',
	},
	{
		title: 'Data Tables & Pages',
		description: 'Dynamic data table for your model.',
		icon: 'i-lucide-truck',
	},
	{
		title: 'Confirm',
		description: 'Generate your dynamic files.',
		icon: 'ic:round-save',
	},
]

const stepper = useTemplateRef('stepper')

const modelFields = reactive({
	name: '',
	fields: [],
})

async function generateFiles(folder: string, filename: string, type: string, content: string) {
	await $fetch('/api/generate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ folder, filename, type, content }),
	})

	useToast().add({
		title: 'Success',
		description: 'File generated Successfully.',
		duration: 1500,
		color: 'success',
	})
}

const modelAndFields = ref<any>(null)
const databaseMigrations = ref<any>(null)
function startGenerate() {
	console.log(modelAndFields.value, databaseMigrations.value)
}
</script>
