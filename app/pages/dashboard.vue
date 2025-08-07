<template>
	<div class="flex gap-1 self-center">
		<UButton
			class="cursor-pointer rounded-sm"
			label="Modal"
			icon="lineicons:dialogflow"
			@click="openModal" />

		<UButton
			class="cursor-pointer"
			label="Reset"
			icon="material-symbols:reset-wrench"
			@click="useLnForm.reset(form)" />

		<UButton
			class="cursor-pointer"
			label="Validate"
			icon="material-symbols:person-check-rounded"
			@click="useLnForm.validate(form)" />
		<LnExport
			v-for="(exporter, key) in [
				{ type: 'pdf', icon: 'ant-design:file-pdf-filled' },
				{ type: 'csv', icon: 'file-icons:microsoft-excel' },
			]"
			:key="key"
			:export="exportFile">
			<template #default="{ exportFile: startExporting, pending }">
				<UButton
					class="cursor-pointer rounded-sm"
					:label="`Export ${exporter.type.toUpperCase()}`"
					:icon="exporter.icon"
					:loading="pending"
					@click="startExporting(exporter.type)" />
			</template>
		</LnExport>
	</div>
</template>

<script setup lang="ts">
const exportFile = reactive<LnExport>({
	headers: [
		{
			label: 'Full Name',
			valueKey: 'full_name',
			formatter: (user: { first_name: string; last_name: string }) => {
				return `${user.first_name} ${user.last_name}`
			},
		},
		{
			label: 'Email Address',
			valueKey: 'email',
		},
		{
			label: 'Birthdate',
			valueKey: 'birthdate',
		},
		{
			label: 'Zip Code',
			valueKey: 'address.zip_code',
		},
		{
			label: 'Complete Location',
			valueKey: 'address.complete_location',
		},
	],
	label: 'Export users',
	server: {
		protocol: 'rest',
		endpoint: '/api/users',
	},
})

const payload = reactive({
	full_name: 'Mashiyyat Delos Santos',
	email: 'delossantos.mash@gmail.com',
	gender: 'Female',
	status: 1,
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
	address: {
		city: 'San Jose del Monte',
		municipality: 'Bulacan',
		complete_address: 'Rd.1 Brgy Minuyan 3 Blk 39 Lot 33',
	},
	referrer: {
		full_name: 'Merry Grace Managuit',
		email: 'merrygrace27@gmail.com',
	},
	developers: [
		{
			id: 5,
			name: 'Brewer Rogeon',
			email: 'fegdalej@infoseek.co.jp',
			address: 'Denton, Texas, United States',
		},
		{
			id: 6,
			name: 'Krishna Spellissy',
			email: 'idrains4u@google.com.hk',
			address: 'New Braunfels, Texas, United States',
		},
		{
			id: 7,
			name: 'Filippa Cunliffe',
			email: 'prawlingson4w@phoca.cz',
			address: 'Lubbock, Texas, United States',
		},
	],
	customers: [5, 6, 7],
})

const form = reactive<LnForm>({
	title: 'User Form',
	description: 'This is a sample form for users',
	fields: {
		full_name: {
			type: 'input',
			label: 'Full name',
			attributes: {
				placeholder: 'Enter your full name here.',
				class: 'w-full',
				icon: 'material-symbols:edit-note',
			},
			grid: 'col-span-12',
			description: 'Please enter your full name.',
			validateOnChange: true,
			validations: {
				rules: 'required|min:5',
				messages: {
					required: 'Please provide your full name.',
					min: 'Minimum 5 characters are required.',
				},
			},
		},
		gender: {
			type: 'select',
			label: 'Select gender',
			grid: 'col-span-12',
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
		status: {
			type: 'select',
			label: 'Select Status',
			grid: 'col-span-12',
			attributes: {
				placeholder: 'This is a sample input',
				selectedIcon: 'material-symbols:check-box',
				class: 'w-full',
				color: 'success',
				defaultValue: 1,
				labelKey: 'name',
				valueKey: 'value',
			},
			dropdown: {
				type: 'object',
				labelKey: 'name',
				valueKey: 'value',
				items: [
					{
						name: 'OPEN',
						value: 1,
					},
					{
						name: 'CLOSED',
						value: 2,
					},
					{
						name: 'ACTIVE',
						value: 3,
					},
					{
						name: 'DISABLED',
						value: 4,
					},
				],
			},
			returnObject: true,
		},
		users: {
			type: 'select-menu',
			label: 'Select User',
			grid: 'col-span-12',
			nullInUndefined: true,
			attributes: {
				multiple: true,
				placeholder: 'This is a sample input',
				class: 'w-full',
				labelKey: 'email',
				valueKey: 'id',
			},
			dropdown: {
				type: 'object',
				labelKey: 'email',
				valueKey: 'id',
			},
			server: {
				protocol: 'rest',
				endpoint: '/api/users',
			},
			validations: {
				rules: 'required',
				messages: {
					required: 'Please select a user',
				},
			},
		},
		developers: {
			type: 'select-menu',
			label: 'Select Developers',
			grid: 'col-span-12',
			nullInUndefined: true,
			validateOnChange: true,
			attributes: {
				placeholder: 'This is a sample input',
				class: 'w-full',
				multiple: true,
				valueKey: 'id',
				labelKey: 'email',
			},
			dropdown: {
				type: 'object',
				labelKey: 'email',
				valueKey: 'id',
			},
			server: {
				protocol: 'rest',
				endpoint: '/api/users',
			},
			validations: {
				rules: 'required|noEmptyArray',
				messages: {
					required: 'Please select a user',
					noEmptyArray: 'Please select at least 1 developer',
				},
			},
		},
		customers: {
			type: 'input-menu',
			label: 'Select Customers',
			grid: 'col-span-12',
			nullInUndefined: true,
			validateOnChange: true,
			attributes: {
				placeholder: 'This is a sample input',
				deleteIcon: 'i-lucide-trash',
				multiple: true,
				valueKey: 'id',
				labelKey: 'email',
			},
			dropdown: {
				type: 'object',
				labelKey: 'email',
				valueKey: 'id',
			},
			server: {
				protocol: 'rest',
				endpoint: '/api/users',
			},
			validations: {
				rules: 'required|noEmptyArray',
				messages: {
					required: 'Please select a user',
					noEmptyArray: 'Please select at least 1 developer',
				},
			},
		},
	},
	ui: {
		body: 'lg:p-2 md:p-2 sm:p-2 p-2',
		header: 'lg:p-2 md:p-2 sm:p-2 p-2',
	},
})

function openModal() {
	useLnModal(
		{
			form,
			attributes: {
				title: 'LaraNuxt Dynamic Modal',
				close: true,
				dismissible: false,
				ui: {
					footer: 'sm:p-2 p-2',
					body: 'xl:p-2 lg:p-2 md:p-2 sm:p-2 p-2',
					close: 'rounded-full cursor-pointer',
					content: 'rounded-md',
				},
			},
			preview: {
				title: 'Preview',
				icon: 'material-symbols:check',
				description: 'Info preview for confirmation',
				attributes: {
					class: 'rounded-sm',
					ui: {
						header: 'lg:p-2 md:p-2 sm:p-2 xs:p-2 p-2',
						body: 'xl:p-2 lg:p-2 md:p-2 sm:p-2 p-2',
					},
				},
			},
		},
		payload,
		(response: any) => {
			console.log(response)
		}
	)
}

//const formValue = computed(() => useLnForm.get(form))
//watch(formValue, () => console.log('Form Value Changed'))

definePageMeta({ layout: 'dashboard' })
</script>
