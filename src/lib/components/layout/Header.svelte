<script lang="ts">
	import {
		Home,
		LineChart,
		Package,
		Package2,
		PanelLeft,
		Search,
		ShoppingCart,
		UsersRound
	} from 'lucide-svelte';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index';
	import { Button } from '$lib/components/ui/button/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import { Input } from '$lib/components/ui/input/index';
	import * as Sheet from '$lib/components/ui/sheet/index';
	import { searchPostResults, searchPostTerm } from '$lib/stores/searchStore';
	import { debounce } from '$lib/debounce';
	import { enhance } from '$app/forms';
	import { browser } from '$app/environment';
	export let user;
	export let form: HTMLFormElement;
	let inputElement: HTMLInputElement;
	const submitForm = () => {
		form.requestSubmit();
	};

	// const focusOnInput = () => {
	// 	};
</script>

<header
	class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
				<PanelLeft class="h-5 w-5" />
				<span class="sr-only">Toggle Menu</span>
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="left" class="sm:max-w-xs">
			<nav class="grid gap-6 text-lg font-medium">
				<a
					href="##"
					class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
				>
					<Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
					<span class="sr-only">Acme Inc</span>
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<Home class="h-5 w-5" />
					Dashboard
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<ShoppingCart class="h-5 w-5" />
					Orders
				</a>
				<a href="##" class="flex items-center gap-4 px-2.5 text-foreground">
					<Package class="h-5 w-5" />
					Products
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<UsersRound class="h-5 w-5" />
					Customers
				</a>
				<a
					href="##"
					class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
				>
					<LineChart class="h-5 w-5" />
					Settings
				</a>
			</nav>
		</Sheet.Content>
	</Sheet.Root>
	<Breadcrumb.Root class="hidden md:flex">
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="##">Dashboard</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Link href="##">Products</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator />
			<Breadcrumb.Item>
				<Breadcrumb.Page>All Products</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>

	{#if !user}
		<div class="relative ml-auto flex flex-1 gap-4 md:grow-0">
			<Button href="/admin/login" class="px-4">Login</Button>
			<Button href="/admin/register" class="px-4">Register</Button>
		</div>
	{:else}
		<form
			class="relative ml-auto flex-1 md:grow-0"
			action="?/search-posts"
			method="POST"
			bind:this={form}
			use:enhance={() => {
				// return ({ update }) =>

				return async ({ result, update }) => {
					update({ reset: false, invalidateAll: true });
					console.log('search results', result);
					searchPostResults.set(result.data.posts);
				};
			}}
		>
			<Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
			<Input
				type="search"
				placeholder="Search..."
				class="input-search w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
				name="search"
				on:keyup={debounce(submitForm, 700)}
				autofocus
			/>
		</form>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button
					builders={[builder]}
					variant="outline"
					size="icon"
					class="overflow-hidden rounded-full"
				>
					<img
						src="https://github.com/shadcn.png"
						width={36}
						height={36}
						alt="Avatar"
						class="overflow-hidden rounded-full"
					/>
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end">
				<DropdownMenu.Label>My Account</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Settings</DropdownMenu.Item>
				<DropdownMenu.Item>Support</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>Logout</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</header>
