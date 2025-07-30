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

			default:
				input.value = value

				break
		}
	}

	const validate = () => {}

	return {
		getValue,
		setValue,
		validate,
	}
}
