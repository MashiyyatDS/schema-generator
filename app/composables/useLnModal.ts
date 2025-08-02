import type { LnModal as LnModalParams } from '#imports'
import { LnModal } from '#components'

export default function (modalParams: LnModalParams) {
	const modal = useOverlay().create(LnModal)

	modal.open({ modelValue: modalParams })
}
