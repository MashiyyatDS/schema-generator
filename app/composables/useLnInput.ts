import { validate } from 'robust-validator'

export default function (input: LnInput) {
	const getValue = () => (input?.value !== undefined ? input?.value : input?.nullInUndefined ? null : input?.value)

	const setValue = (value: unknown | any) => {
		switch (input.type) {
			case 'select':
				if (input.dropdown.type === 'object') {
					const valueKey = input.dropdown.valueKey

					input.value = input.attributes?.multiple ? value.map((item: any) => item[valueKey]) : value
				} else {
					input.value = value
				}

				break

			case 'calendar-input':
				break

			default:
				input.value = value

				break
		}
	}

	const resetValue = () => {
		const undefinedNull = input?.nullInUndefined ? null : undefined

		input.value = 'defaultValue' in input.attributes ? input.attributes.defaultValue : undefinedNull

		input.errors = ''
	}

	const validateValue = async (fieldName: string) => {
		if (!input.validations) return { isValid: true }

		const result = await validate({ [fieldName]: input.value }, { [fieldName]: input.validations?.rules })

		input.errors = result.isInvalid ? result.errors[fieldName]?.map((error) => input.validations?.messages[error.rule]).join(', ') : ''

		return result
	}

	return {
		getValue,
		setValue,
		resetValue,
		validateValue,
	}
}
