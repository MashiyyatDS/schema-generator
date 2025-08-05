import { validate } from 'robust-validator'

export default function (input: LnInput) {
	function getValue() {
		return input?.value
			? input.value
			: input?.nullInUndefined
			? null
			: 'defaultValue' in input.attributes
			? input.attributes.defaultValue
			: undefined
	}

	function setValue(value: unknown | any) {
		switch (input.type) {
			case 'select':
				setSelectInput(input, value)

				break

			case 'select-menu':
				setSelectInput(input, value)

				break

			case 'input-menu':
				setSelectInput(input, value)

				break

			case 'calendar-input':
				break

			default:
				input.value = value

				break
		}
	}

	function setSelectInput(
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
					typeof item === 'object' ? item[valueKey] : item
				)
			} else {
				select.value = typeof value === 'object' ? value[valueKey] : value
			}
		} else {
			select.value = value
		}

		//select.trueValue = value
	}

	const resetValue = () => {
		const undefinedNull = input?.nullInUndefined ? null : undefined

		input.value =
			'defaultValue' in input.attributes ? input.attributes.defaultValue : undefinedNull

		input.errors = undefined
	}

	const validateValue = async (fieldName: string) => {
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

	return {
		getValue,
		setValue,
		resetValue,
		validateValue,
	}
}
