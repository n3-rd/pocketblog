<script lang="ts">
	import { LineChart, NotebookPen, Settings, UsersRound, Webhook } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index';
	import type { ComponentType } from 'svelte';
	import type { Icon } from 'lucide-svelte';

	const navItems = [
		{ name: 'Posts', icon: NotebookPen, href: '/admin/app' },
		{ name: 'Users', icon: UsersRound, href: '/admin/app/users' },
		{ name: 'Analytics', icon: LineChart, href: '/admin/app/analytics' },
		{ name: 'Webhooks', icon: Webhook, href: '/admin/app/webhooks' }
	];
</script>

<aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
	<nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
		{#each navItems as { name, icon, href }}
			<Tooltip.Root>
				<Tooltip.Trigger asChild let:builder>
					<a
						{href}
						class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
						use:builder.action
						{...builder}
					>
						<!-- <icon class="h-5 w-5" /> -->
						<svelte:component this={icon} size="18" />
						<span class="sr-only">{name}</span>
					</a>
				</Tooltip.Trigger>
				<Tooltip.Content side="right">{name}</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</nav>
	<nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<Button
					on:click={toggleMode}
					variant="link"
					size="icon"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
				>
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Settings</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger asChild let:builder>
				<a
					href="##"
					class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
					use:builder.action
					{...builder}
				>
					<Settings class="h-5 w-5" />
					<span class="sr-only">Settings</span>
				</a>
			</Tooltip.Trigger>
			<Tooltip.Content side="right">Settings</Tooltip.Content>
		</Tooltip.Root>
	</nav>
</aside>
