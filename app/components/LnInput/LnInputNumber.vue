<template>
	<UInputNumber v-model="lnInputNumber.value" v-bind="lnInputNumber.attributes" />
</template>

<script setup lang="ts">
import type { LnInputNumber } from '~/types/laranuxt/LnInput'

const lnInputNumber = defineModel<LnInputNumber>({ required: true })
</script>
