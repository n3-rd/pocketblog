<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';

	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import SideNav from '$lib/components/layout/SideNav.svelte';
	import Header from '$lib/components/layout/Header.svelte';
	import Published from '$lib/components/layout/posts/Published.svelte';
	import UnPublished from '$lib/components/layout/posts/UnPublished.svelte';
	import AllPosts from '$lib/components/layout/posts/AllPosts.svelte';

	export let data;
	console.log(data);
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<SideNav />
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<Header user={data.user} />
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<Tabs.Root value="all">
				<div class="flex items-center">
					<Tabs.List>
						<Tabs.Trigger value="all">All</Tabs.Trigger>
						<Tabs.Trigger value="published">Published</Tabs.Trigger>
						<Tabs.Trigger value="unpublished">Unpublished</Tabs.Trigger>
					</Tabs.List>
					<div class="ml-auto flex items-center gap-2">
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button builders={[builder]} variant="outline" size="sm" class="h-8 gap-1">
									<ListFilter class="h-3.5 w-3.5" />
									<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>Filter by</DropdownMenu.Label>
								<DropdownMenu.Separator />
								<DropdownMenu.CheckboxItem checked>Active</DropdownMenu.CheckboxItem>
								<DropdownMenu.CheckboxItem>Draft</DropdownMenu.CheckboxItem>
								<DropdownMenu.CheckboxItem>Archived</DropdownMenu.CheckboxItem>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
						<Button size="sm" variant="outline" class="h-8 gap-1">
							<File class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Export </span>
						</Button>
						<Button size="sm" class="h-8 gap-1">
							<CirclePlus class="h-3.5 w-3.5" />
							<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Create Post</span>
						</Button>
					</div>
				</div>
				<Tabs.Content value="all">
					<AllPosts />
				</Tabs.Content>
				<Tabs.Content value="published">
					<Published />
				</Tabs.Content>
				<Tabs.Content value="unpublished">
					<UnPublished />
				</Tabs.Content>
			</Tabs.Root>
		</main>
	</div>
</div>
