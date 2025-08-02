<template>
	<div class="p-1">
		<LnForm v-model="form" />

		<div class="flex gap-1">
			<UButton label="Validate" @click="useLnForm.validate(form)" />

			<UButton label="Reset" @click="useLnForm.reset(form)" />

			<UButton label="Get Values" @click="getData" />

			<UButton label="Set Values" @click="useLnForm.setFormData(form, serverData)" />

			<UButton label="Open Modal" @click="openModal" />
		</div>
	</div>
</template>

<script setup lang="ts">
const serverData = reactive({
	first_name: 'Merry Grace',
	middle_name: 'Patricio',
	last_name: 'Managuit',
	email: 'mesemenu@mailinator.com',
	gender: 'Female',
	users: [2, 4, 6, 8],
	status: 2,
	address: {
		city: 'Quidem doloribus vol',
		municipality: 'Omnis dolorem nemo d',
		complete_address: 'Ducimus recusandae',
	},
	referrer: {
		full_name: 'Darrel Castillo',
		email: 'byheba@mailinator.com',
	},
})

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
			variant: 'subtle',
			ui: {
				body: 'sm:p-2 p-2',
				header: 'sm:p-2 p-2',
				root: 'rounded-sm mt-1',
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
			ui: {
				body: 'sm:p-2',
				header: 'sm:p-2 p-2',
				root: 'rounded-sm mt-1',
			},
			variant: 'subtle',
		},
	},
	ui: {
		body: 'sm:p-3 p-2',
		header: 'p-2',
		root: 'rounded-sm',
	},
})

function getData() {
	const formData = useLnForm.getValue(form)

	console.log(formData)
}

function openModal() {
	useLnModal({
		form,
		attributes: {
			title: 'Sample Form',
			description: 'This is a sample form inside a modal component.',
			dismissible: false,
			close: false,
			ui: {
				footer: 'sm:p-2 p-2 flex justify-end',
				body: 'sm:p-2 p-2',
				header: 'sm:p-2 p-2',
			},
		},
	})
}

definePageMeta({
	layout: 'default',
})
</script>
