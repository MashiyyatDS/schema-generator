class UseLnForm {
	getFormData(lnForm: LnForm) {
		const data: Record<string, any> = {}

		Object.entries(lnForm.fields).map(([key, field]) => {
			data[key] = useLnInput(field).getValue()
		})

		if (lnForm?.forms) {
			Object.entries(lnForm?.forms).map(([key, fForm]) => {
				const formValue = this.getFormData(fForm)
				data[key] = formValue
			})
		}

		return data
	}

	setFormData(lnForm: LnForm, payload: Record<string, any>) {
		for (const [key, field] of Object.entries(lnForm.fields)) {
			if (!payload[key]) return

			useLnInput(field).setValue(payload[key])
		}

		if (lnForm.forms) {
			Object.entries(lnForm.forms).map(([key, fForm]) => {
				if (!payload[key]) return

				this.setFormData(fForm, payload[key])
			})
		}
	}

	resetForm(lnForm: LnForm) {
		Object.values(lnForm.fields).map((field) => useLnInput(field).resetValue())

		if (lnForm.forms) {
			Object.values(lnForm.forms).map((form) => this.resetForm(form))
		}
	}

	async validateForm(lnForm: LnForm) {
		const fields: LnInput[] = []

		Object.values(lnForm.fields).map((field) => fields.push(field))

		if (lnForm.forms) {
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

		return results
	}
}

const useLnForm = new UseLnForm()
export default useLnForm
