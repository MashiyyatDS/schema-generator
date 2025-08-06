class UseLnForm {
	get(lnForm: LnForm) {
		const data: Record<string, any> = {}

		for (const [key, field] of Object.entries(lnForm.fields)) {
			data[key] = useLnInput.get(field)
		}

		if (lnForm?.forms) {
			for (const [key, form] of Object.entries(lnForm.forms)) {
				const formValue = this.get(form)

				data[key] = formValue
			}
		}

		return data
	}

	set(lnForm: LnForm, payload: Record<string, any>) {
		for (const [key, field] of Object.entries(lnForm.fields)) {
			if (payload[key]) useLnInput.set(field, payload[key])
		}

		if (lnForm.forms) {
			for (const [key, form] of Object.entries(lnForm.forms)) {
				if (payload[key]) this.set(form, payload[key])
			}
		}
	}

	reset(lnForm: LnForm) {
		for (const field of Object.values(lnForm.fields)) {
			useLnInput.reset(field)
		}

		if (lnForm.forms) {
			for (const form of Object.values(lnForm.forms)) {
				this.reset(form)
			}
		}
	}

	async validate(lnForm: LnForm): Promise<boolean> {
		const collectFields = (form: LnForm): LnInput[] => {
			let fields: LnInput[] = Object.values(form.fields)

			if (form.forms) {
				for (const nestedForm of Object.values(form.forms)) {
					fields = fields.concat(collectFields(nestedForm))
				}
			}

			return fields
		}

		const allFields = collectFields(lnForm)

		const results = await Promise.all(
			allFields.map(async (field) => {
				const { isValid } = await useLnInput.validate(field, 'field')
				return { field, isValid }
			})
		)

		return results.every((result) => result.isValid)
	}
}

const useLnForm = new UseLnForm()
export default useLnForm
