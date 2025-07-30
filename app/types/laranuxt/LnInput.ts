import type { InputProps } from '@nuxt/ui/components/Input.vue'
import type { SelectProps } from '@nuxt/ui/components/Select.vue'
import type { TextareaProps } from '@nuxt/ui/components/Textarea.vue'

export interface LnInputBaseInterface {
	type:
		| 'calendar-input'
		| 'input'
		| 'input-menu'
		| 'input-number'
		| 'input-tags'
		| 'pin'
		| 'radio-group'
		| 'select'
		| 'select-menu'
		| 'slider'
		| 'switch'
		| 'textarea'
	/**
	 * Use the `label` prop to set the label for the form control.
	 */
	label?: string
	/**
	 * Use the `hint` prop to display a hint message next to the label.
	 */
	hint?: string
	/**
	 * Use the `description` prop to provide additional information below the label.
	 */
	description?: string
	/**
	 * Check out https://tailwindcss.com/docs/grid-column for more details in grid system.
	 */
	grid?: string
	/**
	 * Use `hidden` property to hide the element, this property will only hide the element but will retain the model value.
	 */
	hidden?: boolean
	/**
	 * Use the `default` property to set the default value of the input field.
	 */
	defaultValue?: unknown
	/**
	 * Use the `value` property to retrieve the model value of the field.
	 */
	value?: any
	validations?: {
		rules: string
		messages: Record<string, string>
	}
}

interface RestProtocol {
	protocol: 'rest'
	endpoint: string
}

interface GraphQLProtocol {
	protocol: 'graphql'
	model: string
	method?: string
	fetchPolicy?: 'cache-first' | 'cache-and-network' | 'cache-only' | 'network-only' | 'no-cache'
	relation?: 'connect' | 'upsert' | 'sync' | 'syncWithoutDetaching'
}

type ServerMethod = RestProtocol | GraphQLProtocol

interface ObjectDropdown<M = string> {
	type: 'object'
	valueKey: M extends string ? string : keyof M
	labelKey: M extends string ? string : keyof M
	items?: M extends string ? Record<string, unknown>[] : { [K in keyof M]?: unknown }[]
}

interface StringDropdown {
	type: 'default'
	items: string[]
}

export interface LnInputSelect<M = string> extends LnInputBaseInterface {
	type: 'select'
	attributes: SelectProps | Record<string, unknown>
	server?: ServerMethod
	dropdown: ObjectDropdown<M> | StringDropdown
}

export interface LnInputDefault extends LnInputBaseInterface {
	type: 'input'
	attributes: InputProps | Record<string, unknown>
}

export interface LnInputTextarea extends LnInputBaseInterface {
	type: 'textarea'
	attributes: TextareaProps | Record<string, unknown>
}

export type LnInput = LnInputDefault | LnInputSelect | LnInputTextarea
