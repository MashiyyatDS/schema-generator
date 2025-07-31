import type { ModalProps } from '@nuxt/ui/components/Modal.vue'

export interface LnForm<M = string> {
	title?: string
	description?: string
	fields: M extends string ? { [key: string]: LnInput } : { [K in keyof M]?: LnInput }
	uploader?: boolean
	attributes: ModalProps | Record<string, any>
	forms?: {
		[key: string]: LnForm
	}
	multipleForms?: {
		[key: string]: {
			form: LnForm
			items?: LnForm[]
		}
	}
}
