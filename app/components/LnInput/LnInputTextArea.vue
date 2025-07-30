<template>
	<UTextarea v-bind="lnInput.attributes" v-model="lnInput.value" />
</template>

<script setup lang="ts">
import type { LnInputTextarea } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInputTextarea>({ required: true })
</script>
