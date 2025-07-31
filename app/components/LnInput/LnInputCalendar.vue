<template>
	<UPopover>
		<UButton color="neutral" variant="subtle" icon="i-lucide-calendar" block class="hover:cursor-pointer">
			{{ lnInputCalendar?.value ? df.format(lnInputCalendar?.value.toDate(getLocalTimeZone())) : 'Select a date' }}
		</UButton>

		<template #content>
			<UCalendar v-model="lnInputCalendar.value" class="p-2" />
		</template>
	</UPopover>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone } from '@internationalized/date'
import type { LnInputCalendar } from '~/types/laranuxt/LnInput'

const df = new DateFormatter('en-US', { dateStyle: 'full' })

const lnInputCalendar = defineModel<LnInputCalendar>({ required: true })
</script>
