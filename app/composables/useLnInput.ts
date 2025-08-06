import { validate } from 'robust-validator'

export class UseLnInput {
	/**
	 * use UseLnInput.get to retrieve the input model value.
	 *
	 * @params input: LnInput
	 */
	get(input: LnInput) {
		return input?.value
			? input.value
			: input?.nullInUndefined
			? null
			: 'defaultValue' in input.attributes
			? input.attributes.defaultValue
			: undefined
	}

	/**
	 * use UseLnInput.get to set the input model value.
	 *
	 * @params input: LnInput
	 * @params value - value to assign inside the input model value.
	 */
	set(input: LnInput, value: unknown) {
		switch (input.type) {
			case 'select':
				this.setSelectInput(input, value)

				break

			case 'select-menu':
				this.setSelectInput(input, value)

				break

			case 'input-menu':
				this.setSelectInput(input, value)

				break

			case 'calendar-input':
				break

			default:
				input.value = value

				break
		}
	}

	protected setSelectInput(
		select: LnInputSelect | LnInputSelectMenu | LnInputMenu,
		value: unknown | any
	) {
		/**
		 * value: {name: "OPEN", value: 1}
		 * value: [{name: "OPEN", value: 1}, {name: "CLOSED", value: 2}]
		 * value: 1
		 * value: [1,2,3,4,5]
		 */
		if (select.dropdown.type === 'object') {
			const valueKey = select.dropdown.valueKey

			if (Array.isArray(value)) {
				select.value = value.map((item) =>
					typeof item === 'object' ? (select?.returnObject ? item : item[valueKey]) : item
				)
			} else {
				select.value =
					typeof value === 'object'
						? select?.returnObject
							? value
							: value[valueKey]
						: value
			}
		} else {
			select.value = value
		}
	}

	/**
	 * use UseLnInput.reset to reset the input model value.
	 *
	 * @params input: LnInput
	 */
	reset(input: LnInput) {
		const undefinedNull = input?.nullInUndefined ? null : undefined

		input.value =
			'defaultValue' in input.attributes ? input.attributes.defaultValue : undefinedNull

		input.errors = undefined
	}

	/**
	 * use UseLnInput.validate to validate the input model value.
	 * Ensure to provide a validation property inside your input property.
	 *
	 * @params input: LnInput
	 */
	async validate(input: LnInput, fieldName: string) {
		if (!input.validations) return { isValid: true }

		const result = await validate(
			{ [fieldName]: input.value },
			{ [fieldName]: input.validations?.rules }
		)

		input.errors = result.isInvalid
			? result.errors[fieldName]
					?.map((error) => input.validations?.messages[error.rule])
					.join(', ')
			: undefined

		return result
	}
}

const useLnInput = new UseLnInput()
export default useLnInput
