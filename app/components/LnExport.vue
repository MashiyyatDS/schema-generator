<template>
	<slot name="default" v-bind="{ pending, exportFile }" />
</template>

<script setup lang="ts">
import type { LnExport } from '~/types/laranuxt/LnForm'

const { pending, data, execute } = useAsyncData(
	`export-data-${generateRandom6DigitNumber()}`,
	async () => {
		const response = (await $fetch('/api/users')).map((user) => ({
			...user,
			referrer: { ...user },
			address: {
				complete_location: user.address,
				municipality: 'Bulacan',
				city: 'San Jose del Monte',
				lot: 33,
				block: 39,
				zip_code: 3023,
			},
		}))

		return response
	},
	{
		immediate: false,
	}
)

const props = withDefaults(defineProps<{ export: LnExport }>(), {})

async function exportFile(type: 'csv' | 'pdf' | string) {
	await execute()

	const items: Record<string, any>[] =
		data.value?.map((value) => {
			const formattedObject: Record<string, unknown> = {}

			props.export.headers.map((header) => {
				formattedObject[header.label] = header.formatter
					? header.formatter(value)
					: deepGet(header.valueKey, value)
			})

			return formattedObject
		}) ?? []

	if (type === 'pdf') {
		useLnExport.exportPdf(
			items,
			props.export.headers?.map((header) => ({
				header: header.label,
				dataKey: header.label,
			}))
		)
	} else {
		useLnExport.exportCsv(items)
	}

	useToast().add({
		title: 'Success',
		description: `Your ${type.toLocaleUpperCase()} file was successfully exported.`,
		color: 'success',
		duration: 1500,
	})
}
</script>
