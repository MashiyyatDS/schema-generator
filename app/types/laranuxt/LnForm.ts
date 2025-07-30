interface LnForm<M = string> {
	title?: string
	description?: string
	multiple?: boolean
	fields: { [K in keyof M]?: LNInput } | Record<string, LNInput>
	forms?: Record<string, LnForm<M>>
	uploader?: boolean
}

export const form: LnForm<UserInterface> = {
	title: 'User name form',
	description: 'This a sample form for creating user data',
	fields: {
		id: {
			hidden: true,
			attributes: {},
			type: 'input',
		},
		first_name: {
			label: 'First name',
			attributes: {},
			type: 'input',
			grid: 'col-span-12',
			validations: {
				rules: 'required|min:25',
				messages: {
					required: 'First name field is required',
					min: 'Minimum 25 characters is required',
				},
			},
		},
		last_name: {
			label: 'Last name',
			attributes: {},
			type: 'input',
			grid: 'col-span-12',
			validations: {
				rules: 'required|min:25',
				messages: {
					required: 'Last name field is required',
					min: 'Minimum 25 characters is required',
				},
			},
		},
		email: {
			label: 'Email',
			attributes: {},
			type: 'input',
			grid: 'col-span-12',
			validations: {
				rules: 'required|min:25',
				messages: {
					required: 'Email field is required',
					min: 'Minimum 25 characters is required',
				},
			},
		},
	},
	forms: {
		posts: {
			title: 'Blogs',
			multiple: true,
			description: 'Create blogs',
			fields: {
				title: {
					label: 'Blog title',
					attributes: {},
					type: 'input',
					grid: 'col-span-12',
					validations: {
						rules: 'required|min:25',
						messages: {
							required: 'Blog title field is required',
							min: 'Minimum 25 characters is required',
						},
					},
				},
				content: {
					label: 'Blog content',
					attributes: {},
					type: 'textarea',
					grid: 'col-span-12',
					validations: {
						rules: 'required|min:25',
						messages: {
							required: 'Blog content field is required',
							min: 'Minimum 25 characters is required',
						},
					},
				},
			},
		},
	},
}

export function useLnForm(form: LnForm) {
	const getValue = () => form

	const setValue = (payload: Record<string, unknown>) => payload

	const validate = () => {}

	const reset = () => {}

	const appendErrors = (errors: Record<string, unknown>) => errors

	return {
		getValue,
		setValue,
		validate,
		reset,
		appendErrors,
	}
}

//const { getValue, reset, setValue, validate, appendErrors } = useLnForm(form)
