<template>
	<UButton label="Generate" @click="generate" />

	<UInput v-model="modelName" placeholder="Enter your model name" />
</template>

<script setup lang="ts">
const modelName = ref('')

async function generateFiles(folder: string, filename: string, type: string, content: string) {
	await $fetch('/api/generate', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ folder, filename, type, content }),
	})

	useToast().add({
		title: 'Success',
		description: 'File generated Successfully.',
		duration: 1500,
		color: 'success',
	})
}

async function generate() {
	const vueContent = `<template>
	<UButton label='Generate' />
</template>`

	await generateFiles('generated/pages', 'manage-users', 'vue', vueContent)
}
</script>
