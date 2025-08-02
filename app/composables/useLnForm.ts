class UseLnForm {
	getValue(lnForm: LnForm) {
		const data: Record<string, any> = {}

		Object.entries(lnForm.fields).map(([key, field]) => {
			data[key] = useLnInput(field).getValue()
		})

		if (lnForm?.forms) {
			Object.entries(lnForm?.forms).map(([key, fForm]) => {
				const formValue = this.getValue(fForm)
				data[key] = formValue
			})
		}

		return data
	}

	setFormData(lnForm: LnForm, payload: Record<string, any>) {
		for (const [key, field] of Object.entries(lnForm.fields)) {
			if (payload[key]) useLnInput(field).setValue(payload[key])
		}

		if (lnForm.forms) {
			Object.entries(lnForm.forms).map(([key, fForm]) => {
				if (payload[key]) this.setFormData(fForm, payload[key])
			})
		}

		this.validate(lnForm)
	}

	reset(lnForm: LnForm) {
		Object.values(lnForm.fields).map((field) => useLnInput(field).resetValue())

		if (lnForm.forms) {
			Object.values(lnForm.forms).map((form) => this.reset(form))
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
				const { isValid } = await useLnInput(field).validateValue('field')
				return { field, isValid }
			})
		)

		return results.every((result) => result.isValid)
	}
}

const useLnForm = new UseLnForm()
export default useLnForm
