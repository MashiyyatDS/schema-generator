export type LnForm = {
	title?: string
	description?: string
	fields: Record<string, LnInput>
	uploader?: boolean
	forms?: Record<string, LnForm>
}
