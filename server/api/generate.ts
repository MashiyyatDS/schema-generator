import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
	if (process.env.NODE_ENV !== 'development') {
		return { error: 'File generation is only allowed in development' }
	}

	const { type, folder, filename, content } = await readBody(event)

	if (!type || !folder || !filename || !content) {
		return { error: 'Missing required fields' }
	}

	const fullPath = path.join(process.cwd(), folder, `${filename}.${type}`)
	try {
		fs.mkdirSync(path.dirname(fullPath), { recursive: true })
		fs.writeFileSync(fullPath, content)
		return { status: 'ok', path: fullPath }
	} catch (error: any) {
		return { error: error.message }
	}
})
