<template>
	<div class="grid grid-cols-12 gap-3 m-2">
		<LnInput v-for="(field, key) in fields" :key="key" :model-value="field" />
	</div>
</template>

<script setup lang="ts">
import type { LnInput } from '~/types/laranuxt/LnInput'

const fields = reactive<{ [key: string]: LnInput }>({
	first_name: {
		type: 'input',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'First Name',
		description: 'This is a sample description',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
	},
	middle_name: {
		type: 'input',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'Middle Name',
		description: 'This is a sample description',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
	},
	last_name: {
		type: 'input',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'Last Name',
		description: 'This is a sample description',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
	},
	description: {
		type: 'textarea',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'Description',
		description: 'This is a sample description',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
	},
	gender: {
		type: 'select',
		label: 'Select gender',
		description: 'This is a sample description',
		grid: 'md:col-span-6 lg:col-span-6 col-span-12',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
		dropdown: {
			type: 'default',
			items: ['Male', 'Female'],
		},
		defaultValue: 'Male',
	},
})
</script>
