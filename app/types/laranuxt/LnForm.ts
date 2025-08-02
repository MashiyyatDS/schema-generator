import type { ModalProps } from '@nuxt/ui/components/Modal.vue'

export type LnForm = {
	title?: string
	description?: string
	fields: Record<string, LnInput>
	uploader?: boolean
	forms?: Record<string, LnForm>
	ui?: {
		body?: string
		header?: string
		footer?: string
		root?: string
	}
	variant?: 'outline' | 'soft' | 'solid' | 'subtle'
}

export type LnModal = {
	attributes?: ModalProps
	form?: LnForm
}
