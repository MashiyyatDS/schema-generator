<template>
	<nav class="fixed top-0 z-60 w-full bg-blue-400 h-[50px]">
		<div class="px-3 py-3 lg:px-5 lg:pl-3">
			<div class="flex items-center justify-between">
				<div class="flex items-center justify-start rtl:justify-end gap-3">
					<UButton icon="material-symbols:menu" class="bg-blue-600" />

					<span class="self-center text-xl"> LaraNuxt </span>
				</div>
				<div class="flex items-center">
					<div class="flex items-center ms-3">
						<!-- Dropdown here... -->
					</div>
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
