import type { LnModal as LnModalParams } from '#imports'
import { LnModal } from '#components'

export default function (modalParams: LnModalParams, payload?: Record<string, any>) {
	const modal = useOverlay().create(LnModal)

	if (modalParams?.form && payload) useLnForm.setFormData(modalParams.form, payload)

	modal.open({ modelValue: modalParams })
}
