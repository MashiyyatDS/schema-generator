<template>
	<pre class="relative">
	    <code ref="codeblock" :class="`language-${lang} rounded-lg`" :contenteditable="editable" v-html="highlightedCode"/>
  </pre>
</template>

<script setup lang="ts">
import hljs from 'highlight.js'
import javascript from 'highlight.js/lib/languages/javascript'
import 'highlight.js/styles/tokyo-night-dark.min.css'

hljs.registerLanguage('javascript', javascript)

const props = withDefaults(defineProps<{ content: string; lang: string; editable?: boolean }>(), {})

const highlightedCode = ref('')

const highlight = () => {
	const result = hljs.highlight(props.content, { language: props.lang })
	highlightedCode.value = result.value
}

watch(() => props.content, highlight, { immediate: true })
</script>
