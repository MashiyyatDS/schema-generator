<template>
	<USwitch v-model="lnInputSwitch.value" v-bind="lnInputSwitch.attributes" />
</template>

<script setup lang="ts">
import type { LnInputSwitch } from '~/types/laranuxt/LnInput'

const lnInputSwitch = defineModel<LnInputSwitch>({ required: true })
</script>
