function formatDate(date: Date) {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const month = months[date.getMonth()]
	const day = date.getDate()
	const year = date.getFullYear()

	let hours = date.getHours()
	const minutes = date.getMinutes().toString().padStart(2, '0')
	const seconds = date.getSeconds().toString().padStart(2, '0')
	const ampm = hours >= 12 ? 'pm' : 'am'

	hours = hours % 12
	hours = hours ? hours : 12

	return `${month} ${day}, ${year} - ${hours}:${minutes}:${seconds} ${ampm}`
}

onmessage = () => {
	const now = new Date()

	const formatted = formatDate(now)

	postMessage(formatted)

	//setInterval(() => {
	//	//postMessage(now.toISOString())
	//	console.log('Working')
	//}, 1000)
}

//sendTime()
