import type { LnModal as LnModalParams } from '#imports'
import { LnModal } from '#components'

export const modalOverlay = useOverlay().create(LnModal)

export default function (
	modelValue: LnModalParams,
	payload?: Record<string, any>,
	callback?: (response?: any) => any
) {
	if (modelValue?.form && payload) useLnForm.set(modelValue.form, payload)

	modalOverlay.open({ modelValue, callback })
}
