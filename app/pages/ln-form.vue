<template>
	<div class="p-2">
		<UButtonGroup>
			<UButton class="cursor-pointer" label="Modal" @click="openModal" />

			<UButton class="cursor-pointer" label="Reset" @click="useLnForm.reset(form)" />

			<UButton class="cursor-pointer" label="Validate" @click="useLnForm.validate(form)" />
		</UButtonGroup>
	</div>
</template>

<script setup lang="ts">
const payload = reactive({
	first_name: 'Mashiyyat',
	middle_name: 'Villasenor',
	last_name: 'Delos Santos',
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
	customers: [
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
})

const form = reactive<LnForm>({
	title: 'User Form',
	description: 'This is a sample form for users',
	fields: {
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
				labelKey: 'name',
				valueKey: 'id',
			},
			dropdown: {
				type: 'object',
				labelKey: 'name',
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
				labelKey: 'name',
			},
			dropdown: {
				type: 'object',
				labelKey: 'name',
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
				class: 'w-full',
				multiple: true,
				valueKey: 'id',
				labelKey: 'name',
			},
			dropdown: {
				type: 'object',
				labelKey: 'name',
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
			//returnObject: true,
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
			//uploader: true,
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

definePageMeta({
	layout: 'default',
})
</script>
