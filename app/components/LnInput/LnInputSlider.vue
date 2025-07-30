<template>
	<USlider v-model="lnInputSlider.value" v-bind="lnInputSlider.attributes" :default-value="lnInputSlider?.defaultValue" />
</template>

<script setup lang="ts">
import type { LnInputSlider } from '~/types/laranuxt/LnInput'

const lnInputSlider = defineModel<LnInputSlider>({ required: true })
</script>
