import type { ModalProps } from '@nuxt/ui/components/Modal.vue'
import type { CardProps } from '@nuxt/ui/components/Card.vue'

export type LnForm = {
	title?: string
	description?: string
	fields: Record<string, LnInput>
	forms?: Record<string, LnForm>
	ui?: {
		body?: string
		header?: string
		footer?: string
		root?: string
	}
	variant?: 'outline' | 'soft' | 'solid' | 'subtle'
}

export type LnFormPreview = {
	title: string
	description?: string
	icon?: string
	attributes?: CardProps
}

export type LnModal = {
	attributes?: ModalProps
	form?: LnForm
	uploader?: boolean
	preview?: LnFormPreview
}

export type LnExport = {
	label?: string
	headers: {
		label: string
		valueKey: string
		formatter?: (valueKey: any) => string
	}[]
	server:
		| {
				protocol: 'graphql'
				model: string
				method?: string
				gql?: any
				fetchPolicy?:
					| 'cache-first'
					| 'cache-and-network'
					| 'cache-only'
					| 'network-only'
					| 'no-cache'
		  }
		| {
				protocol: 'rest'
				endpoint: string
		  }
}
