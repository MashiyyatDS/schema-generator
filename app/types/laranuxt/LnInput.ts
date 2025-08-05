import type { InputNumberProps } from '@nuxt/ui/components/InputNumber.vue'
import type { SelectMenuProps } from '@nuxt/ui/components/SelectMenu.vue'
import type { RadioGroupProps } from '@nuxt/ui/components/RadioGroup.vue'
import type { InputMenuProps } from '@nuxt/ui/components/InputMenu.vue'
import type { TextareaProps } from '@nuxt/ui/components/Textarea.vue'
import type { CalendarProps } from '@nuxt/ui/components/Calendar.vue'
import type { PinInputProps } from '@nuxt/ui/components/PinInput.vue'
import type { SelectProps } from '@nuxt/ui/components/Select.vue'
import type { SwitchProps } from '@nuxt/ui/components/Switch.vue'
import type { SliderProps } from '@nuxt/ui/components/Slider.vue'
import type { InputProps } from '@nuxt/ui/components/Input.vue'

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
	 * Use the `hint` prop to display a help message below the input field.
	 */
	help?: string
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
	 * User the `error` property to apply error message and state for the input.
	 */
	errors?: string
	/**
	 * Use the `value` property to retrieve the model value of the field.
	 */
	value?: any
	/**
	 * Set the field value into `null` instead of `undefined` if a value is not present.
	 */
	nullInUndefined?: boolean
	/**
	 * Allow validating the input field whenever the data value changes.
	 */
	validateOnChange?: boolean
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
	trueValue?: unknown[]
}

export interface LnInputSelectMenu extends LnInputBaseInterface {
	type: 'select-menu'
	attributes: (SelectMenuProps & { valueKey: string }) | Record<string, unknown>
	server?: ServerMethod
	dropdown: ObjectDropdown | StringDropdown
	trueValue?: unknown[]
}

export interface LnInputDefault extends LnInputBaseInterface {
	type: 'input'
	attributes: InputProps | Record<string, unknown>
}

export interface LnInputTextarea extends LnInputBaseInterface {
	type: 'textarea'
	attributes: TextareaProps | Record<string, unknown>
}

export interface LnInputCalendar extends LnInputBaseInterface {
	type: 'calendar-input'
	attributes: CalendarProps | Record<string, unknown>
}

export interface LnInputPin extends LnInputBaseInterface {
	type: 'pin'
	attributes: PinInputProps | Record<string, unknown>
}

export interface LnInputNumber extends LnInputBaseInterface {
	type: 'input-number'
	attributes: InputNumberProps | Record<string, unknown>
}

export interface LnInputSwitch extends LnInputBaseInterface {
	type: 'switch'
	attributes: SwitchProps | Record<string, unknown>
}

export interface LnInputSlider extends LnInputBaseInterface {
	type: 'slider'
	attributes: SliderProps | Record<string, unknown>
}

export interface LnInputMenu extends LnInputBaseInterface {
	type: 'input-menu'
	attributes: InputMenuProps | Record<string, unknown>
}

export interface LnInputRadioGroup<M = string> extends LnInputBaseInterface {
	type: 'radio-group'
	attributes: RadioGroupProps | Record<string, unknown>
	server?: ServerMethod
	dropdown: (ObjectDropdown<M> & { descriptionKey?: string }) | StringDropdown
}

export type LnInput =
	| LnInputDefault
	| LnInputSelect
	| LnInputSelectMenu
	| LnInputTextarea
	| LnInputCalendar
	| LnInputPin
	| LnInputNumber
	| LnInputSwitch
	| LnInputSlider
	| LnInputMenu
	| LnInputRadioGroup
