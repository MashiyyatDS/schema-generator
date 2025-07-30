// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'no-case-declarations': 'off',
		'vue/no-multiple-template-root': 'off',
		'vue/no-v-html': 'off',
		'no-useless-escape': 'off',
	},
})
