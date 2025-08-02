import type { LnModal as LnModalParams } from '#imports'
import { LnModal } from '#components'

export default function (modelValue: LnModalParams, payload?: Record<string, any>, callback?: (response?: any) => any) {
	const modal = useOverlay().create(LnModal)

	if (modelValue?.form && payload) useLnForm.setFormData(modelValue.form, payload)

	modal.open({ modelValue, callback })
}
