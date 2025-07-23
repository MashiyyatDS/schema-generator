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
