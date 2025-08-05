import { setLocales, en, register } from 'robust-validator'
export default defineNuxtPlugin(() => {
	const noEmptyArray = (value: unknown[]) => {
		return value.length > 0
	}

	register('noEmptyArray', noEmptyArray, { en: 'Please select' })

	setLocales(en)
})
