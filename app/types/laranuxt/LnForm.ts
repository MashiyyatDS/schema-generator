import type { ModalProps } from '@nuxt/ui/components/Modal.vue'

export interface LnForm {
	title?: string
	description?: string
	fields: { [key: string]: LnInput }
	uploader?: boolean
	attributes: ModalProps | Record<string, any>
	forms?: {
		[key: string]: LnForm
	}
}
