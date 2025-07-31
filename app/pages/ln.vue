<template>
	<div class="grid grid-cols-12 gap-3 m-2">
		<LnInput v-for="(field, key) in fields" :key="key" :model-value="field" />

		<div class="col-span-12 flex gap-1">
			<UButton label="Get Values" block @click="getValues" />
			<UButton label="Validate" block @click="validateValues" />
			<UButton label="Set Values" block @click="setValues" />
			<UButton label="Reset" block @click="resetValues" />
		</div>
	</div>
</template>

<script setup lang="ts">
const fields = reactive<{ [key: string]: LnInput }>({
	full_name: {
		type: 'input',
		label: 'First Name',
		nullInUndefined: true,
		validateOnChange: true,
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
		validations: {
			rules: 'required|min:10',
			messages: {
				required: 'This field is required',
				min: 'Minimum 10 character is required',
			},
		},
	},
	description: {
		type: 'textarea',
		grid: 'md:col-span-4 lg:col-span-4 col-span-12',
		label: 'Description',
		description: 'This is a sample description',
		validateOnChange: true,
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
		},
		validations: {
			rules: 'required|min:5',
			messages: {
				required: 'This field is required.',
				min: 'Minimum 5 character is required.',
			},
		},
	},
	gender: {
		type: 'select',
		label: 'Select gender',
		grid: 'col-span-4',
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
		grid: 'md:col-span-6 lg:col-span-4 col-span-4',
		nullInUndefined: true,
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
		validations: {
			rules: 'required',
			messages: {
				required: 'Please select a user',
			},
		},
	},
	status: {
		type: 'select',
		label: 'Select Status',
		grid: 'md:col-span-6 lg:col-span-4 col-span-4',
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
			otp: true,
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
		},
	},
	theme: {
		type: 'radio-group',
		label: 'Select Theme',
		grid: 'md:col-span-6 lg:col-span-4 col-span-4 p-3',
		nullInUndefined: true,
		attributes: {
			placeholder: 'This is a sample input',
			class: 'w-full',
			multiple: true,
		},
		dropdown: {
			type: 'default',
			items: ['Dark', 'Light', 'System Default'],
		},
		validations: {
			rules: 'required',
			messages: {
				required: 'Please select a user',
			},
		},
	},
})

function getValues() {
	const data: Record<string, unknown> = {}

	for (const [key, field] of Object.entries(fields)) {
		data[key] = useLnInput(field).getValue()
	}

	console.log(data)
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
	theme: 'Light',
}

function setValues() {
	for (const [key, field] of Object.entries(fields)) {
		useLnInput(field).setValue(values[key])
	}
}

async function validateValues() {
	resetErrors()

	for (const [key, field] of Object.entries(fields)) {
		await useLnInput(field).validateValue(key)
	}
}

function resetErrors() {
	for (const key in fields) {
		if (fields[key]?.errors) fields[key].errors = ''
	}
}

function resetValues() {
	Object.values(fields).map((field) => useLnInput(field).resetValue())
}
</script>
