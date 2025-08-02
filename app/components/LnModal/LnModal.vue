<template>
	<UModal :close="{ onClick: () => emit('close', false) }" v-bind="modal.attributes">
		<template #body>
			<LnForm v-if="modal?.form" v-model="modal.form" />
		</template>

		<template #footer>
			<div class="flex gap-2">
				<UButton color="neutral" label="Dismiss" @click="emit('close', false)" />

				<UButton label="Success" @click="emit('close', true)" />
			</div>
		</template>
	</UModal>
</template>

<script setup lang="ts">
const modal = defineModel<LnModal>({ required: true })

const emit = defineEmits<{ close: [boolean] }>()
</script>
