<template>
	<LnForm :model-value="form" />

	<div class="flex gap-1">
		<UButton class="cursor-pointer" label="Get form value" @click="getFormValue" />

		<UButton class="cursor-pointer" label="Set form value" @click="useLnForm.setFormData(form, serverData)" />

		<UButton class="cursor-pointer" label="Validate" @click="useLnForm.validate(form)" />

		<UButton class="cursor-pointer" label="Reset" @click="useLnForm.reset(form)" />
	</div>
</template>

<script setup lang="ts">
const form = reactive<LnForm>({
	title: 'User Form',
	description: 'This is a sample form for users',
	fields: {
		first_name: {
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
				rules: 'required|min:5',
				messages: {
					required: 'This field is required',
					min: 'Minimum 5 character is required',
				},
			},
		},
		middle_name: {
			type: 'input',
			label: 'Middle Name',
			nullInUndefined: true,
			validateOnChange: true,
			grid: 'md:col-span-4 lg:col-span-4 col-span-12',
			attributes: {
				placeholder: 'This is a sample input',
				class: 'w-full',
			},

			validations: {
				rules: 'required|min:5',
				messages: {
					required: 'This field is required',
					min: 'Minimum 5 character is required',
				},
			},
		},
		last_name: {
			type: 'input',
			label: 'Last Name',
			nullInUndefined: true,
			validateOnChange: true,
			grid: 'md:col-span-4 lg:col-span-4 col-span-12',
			attributes: {
				placeholder: 'This is a sample input',
				class: 'w-full',
			},

			validations: {
				rules: 'required|min:5',
				messages: {
					required: 'This field is required',
					min: 'Minimum 5 character is required',
				},
			},
		},
		email: {
			type: 'input',
			label: 'Email',
			nullInUndefined: true,
			validateOnChange: true,
			grid: 'md:col-span-4 lg:col-span-4 col-span-12',
			attributes: {
				placeholder: 'This is a sample input',
				class: 'w-full',
			},
			validations: {
				rules: 'required|email',
				messages: {
					required: 'This field is required',
					email: 'Please enter a valid email',
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
	},
	forms: {
		address: {
			title: 'Address',
			description: 'This is a sample form for users',
			fields: {
				city: {
					type: 'input',
					label: 'City',
					nullInUndefined: true,
					validateOnChange: true,
					grid: 'md:col-span-4 lg:col-span-4 col-span-6',
					attributes: {
						placeholder: 'This is a sample input',
						class: 'w-full',
					},
					validations: {
						rules: 'required|min:5',
						messages: {
							required: 'This field is required',
							min: 'Minimum 5 character is required',
						},
					},
				},
				municipality: {
					type: 'input',
					label: 'Municipality',
					nullInUndefined: true,
					validateOnChange: true,
					grid: 'md:col-span-4 lg:col-span-4 col-span-6',
					attributes: {
						placeholder: 'This is a sample input',
						class: 'w-full',
					},

					validations: {
						rules: 'required|min:5',
						messages: {
							required: 'This field is required',
							min: 'Minimum 5 character is required',
						},
					},
				},
				complete_address: {
					type: 'textarea',
					label: 'Complete Address',
					nullInUndefined: true,
					validateOnChange: true,
					grid: 'md:col-span-4 lg:col-span-4 col-span-12',
					attributes: {
						placeholder: 'This is a sample input',
						class: 'w-full',
					},

					validations: {
						rules: 'required|min:5',
						messages: {
							required: 'This field is required',
							min: 'Minimum 5 character is required',
						},
					},
				},
			},
		},
		referrer: {
			title: 'Referrer',
			description: 'This is a sample form for users',
			fields: {
				full_name: {
					type: 'input',
					label: 'Full Name',
					nullInUndefined: true,
					validateOnChange: true,
					grid: 'md:col-span-4 lg:col-span-4 col-span-7',
					attributes: {
						placeholder: 'This is a sample input',
						class: 'w-full',
					},
					validations: {
						rules: 'required|min:5',
						messages: {
							required: 'This field is required',
							min: 'Minimum 5 character is required',
						},
					},
				},
				email: {
					type: 'input',
					label: 'Email',
					nullInUndefined: true,
					validateOnChange: true,
					grid: 'md:col-span-4 lg:col-span-4 col-span-5',
					attributes: {
						placeholder: 'This is a sample input',
						class: 'w-full',
					},

					validations: {
						rules: 'required|email',
						messages: {
							required: 'This field is required',
							email: 'Please provide a valid email',
						},
					},
				},
			},
		},
	},
})

const serverData = reactive({
	first_name: 'Grace',
	middle_name: 'Macey Duffy',
	last_name: 'Washington',
	email: 'mesemenu@mailinator.com',
	users: [2, 4, 6, 8],
	address: {
		city: 'Quidem doloribus vol',
		municipality: 'Omnis dolorem nemo d',
		complete_address: 'Ducimus recusandae',
	},
	referrer: {
		full_name: 'Darrel Castillo',
		email: 'byheba@mailinator.com',
	},
	gender: 'Female',
	status: 2,
})

function getFormValue() {
	const formData = useLnForm.getValue(form)

	console.log(formData, 'Working...')
}
</script>
