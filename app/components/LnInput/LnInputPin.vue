<template>
	<UPinInput v-model="lnInputPin.value" v-bind="lnInputPin.attributes" />
</template>

<script setup lang="ts">
import type { LnInputPin } from '~/types/laranuxt/LnInput'

const lnInputPin = defineModel<LnInputPin>({ required: true })
</script>
