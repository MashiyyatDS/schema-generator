<template>
	<div>
		<UApp>
			<!-- Navbar -->
			<nav class="fixed top-0 z-60 w-full border-b border-gray-800 bg-sky-950 h-[50px]">
				<div class="flex items-center justify-between h-full pl-2 pr-2">
					<div class="flex items-center justify-start rtl:justify-end gap-3">
						<UButton
							size="sm"
							icon="material-symbols:menu"
							class="bg-primary cursor-pointer self-center"
							@click="drawer = !drawer" />

						<span class="self-center text-md font-bold text-primary">
							{{ currentDateTime }}
						</span>
					</div>
					<div class="flex items-center">
						<div class="flex items-center ms-3">
							<UDropdownMenu :items="items">
								<UButton
									:avatar="{
										src: 'https://github.com/benjamincanac.png',
										size: 'md',
									}"
									color="neutral"
									variant="ghost"
									class="rounded-full cursor-pointer" />
							</UDropdownMenu>
						</div>
					</div>
				</div>
			</nav>

			<!-- Sidebar -->
			<div
				class="sidebar w-[300px] fixed bottom-0 left-0 z-55 h-screen bg-[#0f172b] transition-transform duration-200 border-r ease-in-out border-gray-800"
				:class="{ '-translate-x-full': !drawer }">
				<div class="sidebar-header flex flex-col p-1 pl-3">
					<span class="font-bold">Mashiyyat DS</span>
					<span class="text-sm text-gray-400">delossantos.mash@gmail.com</span>
				</div>

				<div class="sidebar-content overflow-auto border-t border-gray-800 p-1">
					<UNavigationMenu orientation="vertical" :items="useNavigation" />
				</div>
			</div>

			<div
				id="mainContainer"
				class="p-1 transition-all duration-300 mt-[50px] main-container"
				:class="{ 'sm:ml-[300px]': drawer }">
				<div
					class="p-2 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-800 mb-1">
					<UBreadcrumb :items="breadcrumbItems" />
				</div>

				<slot />
			</div>
		</UApp>
	</div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

const drawer = ref(true)

const breadcrumbItems = computed(() => {
	const route = useRoute()

	const segments = route.fullPath.split('/').filter(Boolean)

	let accumulatedPath = ''

	return segments.map((segment) => {
		accumulatedPath += `/${segment}`

		return {
			label: convertStringCases(segment).regular,
			to: accumulatedPath,
		}
	})
})

const items = ref<DropdownMenuItem[][]>([
	[
		{
			label: 'Mashiyyat Delos Santos',
			avatar: {
				src: 'https://github.com/benjamincanac.png',
			},
			type: 'label',
		},
	],
	[
		{
			label: 'Profile',
			icon: 'i-lucide-user',
		},
		{
			label: 'Billing',
			icon: 'i-lucide-credit-card',
		},
		{
			label: 'Settings',
			icon: 'i-lucide-cog',
			kbds: [','],
		},
		{
			label: 'Keyboard shortcuts',
			icon: 'i-lucide-monitor',
		},
	],
	[
		{
			label: 'Team',
			icon: 'i-lucide-users',
		},
		{
			label: 'Invite users',
			icon: 'i-lucide-user-plus',
			children: [
				[
					{
						label: 'Email',
						icon: 'i-lucide-mail',
					},
					{
						label: 'Message',
						icon: 'i-lucide-message-square',
					},
				],
				[
					{
						label: 'More',
						icon: 'i-lucide-circle-plus',
					},
				],
			],
		},
		{
			label: 'New team',
			icon: 'i-lucide-plus',
			kbds: ['meta', 'n'],
		},
	],
	[
		{
			label: 'GitHub',
			icon: 'i-simple-icons-github',
			//to: 'https://github.com/nuxt/ui',
			target: '_blank',
		},
		{
			label: 'Support',
			icon: 'i-lucide-life-buoy',
			//to: '/components/dropdown-menu',
		},
		{
			label: 'API',
			icon: 'i-lucide-cloud',
			disabled: true,
		},
	],
	[
		{
			label: 'Logout',
			icon: 'i-lucide-log-out',
			kbds: ['shift', 'meta', 'q'],
		},
	],
])

onBeforeMount(() => {
	detectBreakpoint()

	window.addEventListener('resize', () => detectBreakpoint())

	nextTick(() => {
		const mainContainer = document.getElementById('mainContainer') as HTMLDivElement

		mainContainer.addEventListener('click', () => {
			const breakpoints = useBreakpoints(breakpointsTailwind)

			const smAndLarger = breakpoints.smaller('md')

			if (smAndLarger.value && drawer.value) drawer.value = !drawer.value
		})
	})
})

const currentDateTime = ref('')

onMounted(() => {
	nextTick(() => {
		const worker = new Worker(new URL('../workers/time.worker.ts', import.meta.url), {
			type: 'module',
		})

		worker.postMessage('request-time')

		worker.onmessage = (event: MessageEvent) => {
			worker.postMessage('request-time')

			currentDateTime.value = event.data
		}
		//worker.onmessage = (event) => {
		//	console.log(event.data)
		//}
	})
})

function detectBreakpoint() {
	const breakpoints = useBreakpoints(breakpointsTailwind)

	const smAndLarger = breakpoints.smaller('md')

	drawer.value = !smAndLarger.value
}
</script>

<style lang="scss">
.sidebar {
	height: calc(100vh - 50px);

	&-header {
		height: 50px;
	}

	&-content {
		height: calc(100% - 50px);
	}
}

.main-container {
	height: calc(100vh - 50px);
}

.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
}
</style>
