// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/scripts', '@nuxt/ui'],
	css: ['~/assets/main.css'],
	imports: {
		dirs: ['./types/*/*.ts', './composables/*/*.ts'],
	},
	ssr: false,
	plugins: [
		{
			name: 'robust-validator',
			src: '~/plugins/robust-validator',
		},
	],
})
