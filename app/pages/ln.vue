<template>
	<div class="grid grid-cols-12 gap-3 m-2">
		<LnInput v-for="(field, key) in fields" :key="key" :model-value="field" />

		<div class="col-span-12 flex gap-1">
			<UButton label="Get Values" block @click="getValues()" />
			<UButton label="Set Values" block @click="setValues" />
			<UButton label="Validate" block @click="validateValues" />
		</div>
	</div>
</template>

<script setup lang="ts">
import type { LnInput } from '~/types/laranuxt/LnInput'
import { validate, setLocales, en } from 'robust-validator'

setLocales(en)

const fields = reactive<{ [key: string]: LnInput }>({
	full_name: {
		type: 'input',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'First Name',
		nullInUndefined: true,
		validateOnChange: true,
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
		validations: {
			rules: 'required|min:2',
			messages: {
				required: 'This field is required.',
				min: 'Minimum 5 character is required.',
			},
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
		validations: {
			rules: 'required|min:2',
			messages: {
				required: 'This field is required.',
				min: 'Minimum 5 character is required.',
			},
		},
	},
	gender: {
		type: 'select',
		label: 'Select gender',
		grid: 'md:col-span-6 lg:col-span-4 col-span-12',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
			defaultValue: 'Male',
		},
		dropdown: {
			type: 'default',
			items: ['Male', 'Female'],
		},
	},
	users: {
		type: 'select',
		label: 'Select User',
		description: 'This is a sample description',
		grid: 'md:col-span-6 lg:col-span-4 col-span-6',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
			multiple: true,
			defaultValue: 'Male',
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
	},
	status: {
		type: 'select',
		label: 'Select Status',
		description: 'This is a sample description',
		grid: 'md:col-span-6 lg:col-span-4 col-span-6',
		attributes: {
			placeholder: 'This is a sample input',
			selectedIcon: 'material-symbols:check-box',
			class: 'w-full',
			color: 'success',
			defaultValue: 0,
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
	},
	birthdate: {
		type: 'calendar-input',
		grid: 'md:col-span-6 lg:col-span-4 col-span-6',
		label: 'Birthdate',
		attributes: {},
	},
	new_member: {
		type: 'switch',
		grid: 'md:col-span-6 lg:col-span-4 col-span-6',
		label: 'New Member',
		attributes: {
			size: 'lg',
			defaultValue: false,
		},
	},
	pin_number: {
		type: 'pin',
		label: 'Pin Number',
		description: 'This is your PIN Number input',
		grid: 'col-span-6',
		nullInUndefined: true,
		attributes: {
			length: 6,
		},
	},
	balance: {
		type: 'input-number',
		label: 'Balance',
		description: 'This is your current balance',
		grid: 'col-span-6',
		attributes: {
			placeholder: 'Enter your balance',
			orientation: 'vertical',
			class: 'w-full',
		},
		nullInUndefined: true,
		validations: {
			rules: 'required|min:3|numeric',
			messages: {
				required: 'This field is required.',
				min: 'Minimum 2 is required.',
			},
		},
	},
	score: {
		type: 'slider',
		label: 'Score',
		attributes: {
			min: 10,
			max: 100,
			tooltip: true,
			defaultValue: 50,
		},
	},
})

function getValues() {
	const data: Record<string, unknown> = {}

	for (const [key, field] of Object.entries(fields)) {
		data[key] = useLnInput(field).getValue()
	}

	return data
}

const values: Record<string, any> = {
	full_name: 'Merry Grace Patricio Managuit',
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
	balance: 255123000,
	new_member: true,
	score: 69,
}

function setValues() {
	for (const [key, field] of Object.entries(fields)) {
		useLnInput(field).setValue(values[key])
	}
}

const validations = computed((): { rules: Record<string, string>; messages: Record<string, { [key: string]: string }> } => {
	const rules: Record<string, string> = {}
	const messages: Record<string, { [key: string]: string }> = {}

	for (const key in fields) {
		const field = fields[key]

		if (field?.validations) {
			rules[key] = field.validations.rules

			messages[key] = field.validations.messages
		}
	}

	return { rules, messages }
})

async function validateValues() {
	resetErrors()

	const result = await validate(getValues(), validations.value.rules)

	if (result.isInvalid) {
		for (const key in result.errors) {
			result.errors[key]?.map((error) => {
				const ruleMessage = validations.value.messages[key]?.[error.rule]

				if (fields[key]?.attributes) fields[key].errors = ruleMessage
			})
		}

		return
	}

	console.log(getValues())
}

function resetErrors() {
	for (const key in fields) {
		if (fields[key]?.errors) fields[key].errors = ''
	}
}
</script>
