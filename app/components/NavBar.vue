<template>
	<nav
		class="fixed top-0 z-50 w-full border-b bg-white border-gray-200 dark:bg-stone-900 dark:border-gray-700">
		<div class="px-2 py-2 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start rtl:justify-end">
					<UButton
						icon="material-symbols:menu"
						size="md"
						class="sm:hidden"
						@click="sidebar = !sidebar" />

					<span class="font-medium ml-3">LaraNuxt</span>
				</div>

				<div class="flex">
					<UButton
						class="rounded-full mr-3"
						:icon="
							useColorMode().preference === 'dark'
								? 'material-symbols:dark-mode'
								: 'material-symbols:light-mode-rounded'
						"
						@click="
							useColorMode().preference =
								useColorMode().value === 'dark' ? 'light' : 'dark'
						" />

					<UDropdownMenu
						arrow
						:items="items"
						:ui="{
							content: 'w-48',
						}">
						<UButton
							size="xs"
							class="bg-transparent rounded-full hover:cursor-pointer m-0 p-0"
							:avatar="{
								src: 'https://github.com/benjamincanac.png',
								size: 'md',
							}" />
					</UDropdownMenu>
				</div>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const sidebar = ref(false)

const items = ref<DropdownMenuItem[][]>([
	[
		{
			label: 'Profile',
			icon: 'i-lucide-user',
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
			label: 'Logout',
			icon: 'i-lucide-log-out',
			kbds: ['shift', 'meta', 'q'],
		},
	],
])
</script>
