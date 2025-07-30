<template>
	<div class="grid grid-cols-12 gap-3 m-2">
		<LnInput v-for="(field, key) in fields" :key="key" :model-value="field" />

		<div class="col-span-12 flex gap-1">
			<UButton label="Get Values" block @click="getValues" />
			<UButton label="Set Values" block @click="setValues" />
		</div>
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
		nullInUndefined: true,
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
	},
	middle_name: {
		type: 'input',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'Middle Name',
		hint: 'Optional',
		help: 'This field is optional only, you can skip it',
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
		grid: 'md:col-span-6 lg:col-span-4 col-span-12',
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
	users: {
		type: 'select',
		label: 'Select User',
		description: 'This is a sample description',
		grid: 'md:col-span-6 lg:col-span-4 col-span-12',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
			multiple: true,
		},
		dropdown: {
			type: 'object',
			labelKey: 'name',
			valueKey: 'id',
		},
		server: {
			protocol: 'rest',
			endpoint: 'https://retoolapi.dev/yGHdpo/data',
		},
		defaultValue: 'Male',
	},
	status: {
		type: 'select',
		label: 'Select Status',
		description: 'This is a sample description',
		grid: 'md:col-span-6 lg:col-span-4 col-span-12',
		attributes: {
			placeholder: 'This is a sample input',
			selectedIcon: 'material-symbols:check-box',
			class: 'w-full',
			color: 'success',
		},
		dropdown: {
			type: 'object',
			labelKey: 'name',
			valueKey: 'value',
			items: [
				{
					name: 'OPEN',
					value: 0,
				},
				{
					name: 'CLOSED',
					value: 1,
				},
				{
					name: 'ACTIVE',
					value: 2,
				},
				{
					name: 'DISABLED',
					value: 3,
				},
			],
		},
		defaultValue: 0,
	},
	birthdate: {
		type: 'calendar-input',
		label: 'Birthdate',
		attributes: {},
	},
	pin_number: {
		type: 'pin',
		label: 'Pin Number',
		nullInUndefined: true,
		attributes: {
			length: 6,
		},
	},
})

function getValues() {
	const data: Record<string, unknown> = {}

	for (const key in fields) {
		const field = fields[key]
		const inputValue = field?.value ?? field?.defaultValue

		data[key] = inputValue !== undefined ? inputValue : field?.nullInUndefined ? null : inputValue
	}

	console.log(data)
}

const values: Record<string, any> = {
	first_name: 'Merry Grace',
	middle_name: 'Patricio',
	last_name: 'Managuit',
	gender: 'Female',
	status: 3,
	users: [
		{
			id: 1,
			name: 'Eustace Kaminski',
			email: 'fkildea4r@ucsd.edu',
			address: 'Mount Vernon, New York, United States',
		},
		{
			id: 2,
			name: 'Brewer Gwillim',
			email: 'qkopman2y@princeton.edu',
			address: 'Coppell, Texas, United States',
		},
		{
			id: 3,
			name: 'Domini Aitken',
			email: 'hmanketell1n@cbslocal.com',
			address: 'Fresno, California, United States',
		},
		{
			id: 4,
			name: 'Dave Olfert',
			email: 'aovens6f@unesco.org',
			address: 'Escondido, California, United States',
		},
	],
	description: 'This is Merry Grace Managuit details',
	pin_number: [1, 0, 2, 9, 2, 2],
}

function setValues() {
	for (const key in fields) {
		const currentField = fields[key]

		if (!currentField) continue

		if (key in values) {
			switch (currentField.type) {
				case 'select':
					if (currentField.dropdown.type === 'object') {
						const valueKey = currentField.dropdown.valueKey

						currentField.value = currentField.attributes?.multiple ? values[key].map((item: any) => item[valueKey]) : values[key]
					} else {
						currentField.value = values[key]
					}

					break

				default:
					currentField.value = values[key]
					break
			}
		}
	}
}
</script>
