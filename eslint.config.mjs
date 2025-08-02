import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'no-case-declarations': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/require-default-prop': 'off',
		'vue/no-v-html': 'off',
		'no-useless-escape': 'off',
	},
})
