<template>
	<UInput v-bind="lnInput.attributes" v-model="lnInput.value" />
</template>

<script setup lang="ts">
import type { LnInputDefault } from '~/types/laranuxt/LnInput'

const lnInput = defineModel<LnInputDefault>({ required: true })
</script>
