import type { NavigationMenuItem } from '@nuxt/ui'

interface NavigationInterface extends NavigationMenuItem {
	permissions?: string[]
}

const useNavigation = ref<NavigationInterface[][]>([
	[
		{
			label: 'Dashboard',
			icon: 'material-symbols:dashboard',
			to: '/dashboard',
		},
	],
	[
		{
			label: 'Inventory',
			icon: 'i-lucide-book-open',
			defaultOpen: true,
			children: [
				{
					label: 'Manage Inventory',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
					to: '/inventory/manage-inventory',
				},
				{
					label: 'Transfer Inventory',
					icon: 'i-lucide-smile',
					description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
					to: '/inventory/transfer-inventory',
				},
			],
		},
		{
			label: 'Products',
			icon: 'i-lucide-book-open',
			defaultOpen: true,
			children: [
				{
					label: 'Manage Products',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
					to: '/products/manage-products',
				},
				{
					label: 'Product Categories',
					icon: 'i-lucide-smile',
					description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
					to: '/products/product-categories',
				},
				{
					label: 'Product Type',
					icon: 'i-lucide-smile',
					description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
					to: '/products/product-type',
				},
			],
		},
		{
			label: 'Branch',
			icon: 'i-lucide-book-open',
			defaultOpen: true,
			children: [
				{
					label: 'Manage Branches',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
					to: '/branch/manage-branches',
				},
				{
					label: 'Branch Type',
					icon: 'i-lucide-smile',
					description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
					to: '/branch/branch-type',
				},
			],
		},
		{
			label: 'Users',
			icon: 'i-lucide-book-open',
			defaultOpen: true,
			children: [
				{
					label: 'Manage Permissions',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
					to: '/users/manage-permissions',
				},
				{
					label: 'Manage roles',
					icon: 'i-lucide-smile',
					description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
					to: '/users/manage-roles',
				},
				{
					label: 'Manage Users',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
					to: '/users/manage-users',
				},
			],
		},
	],
	[
		{
			label: 'Settings',
			icon: 'material-symbols:dashboard',
			to: '/settings',
		},
		{
			label: 'Themes',
			icon: 'material-symbols:notifications-rounded',
			to: '/themes',
		},
	],
])

export default useNavigation
