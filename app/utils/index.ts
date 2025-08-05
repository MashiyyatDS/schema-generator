export function convertStringCases(input: string) {
	const words = input
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase & PascalCase
		.replace(/[_-]/g, ' ') // snake_case or kebab-case
		.replace(/\s+/g, ' ') // multiple spaces to single
		.trim()
		.toLowerCase()
		.split(' ')

	const capitalize = (w: string): string => w.charAt(0).toUpperCase() + w.slice(1)

	const snake = words.join('_')
	const camel = words[0] + words.slice(1).map(capitalize).join('')
	const pascal = words.map(capitalize).join('')
	const regular = words.map(capitalize).join(' ') // Title case

	return {
		snake,
		camel,
		pascal,
		regular,
	}
}

export function deepGet(nestedKey: string, payload: Record<string, any>) {
	return nestedKey.split('.').reduce((acc: unknown, key: string) => {
		if (acc && typeof acc === 'object' && key in acc) {
			return (acc as Record<string, unknown>)[key]
		}
		return undefined
	}, payload)
}

export function generateRandom6DigitNumber(): number {
	const min = 100000 // Minimum 6-digit number
	const max = 999999 // Maximum 6-digit number
	return Math.floor(Math.random() * (max - min + 1) + min)
}
