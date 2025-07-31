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
	}

	reset(lnForm: LnForm) {
		Object.values(lnForm.fields).map((field) => useLnInput(field).resetValue())

		if (lnForm.forms) {
			Object.values(lnForm.forms).map((form) => this.reset(form))
		}
	}

	async validate(lnForm: LnForm) {
		const fields: LnInput[] = []

		Object.values(lnForm.fields).map((field) => fields.push(field))

		if (lnForm?.forms) {
			Object.values(lnForm.forms).map((form) => {
				Object.values(form.fields).map(async (field) => fields.push(field))
			})
		}

		const results = await Promise.all(
			fields.map(async (field) => {
				const fieldValidation = await useLnInput(field).validateValue('field')

				return fieldValidation
			})
		)

		return results.every((result) => result.isValid)
	}
}

const useLnForm = new UseLnForm()
export default useLnForm
