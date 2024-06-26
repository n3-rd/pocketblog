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
	import { searchPostResults, searchPostTerm } from '$lib/stores/searchStore.js';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	export let posts;
	let search: string;
	let publishedPosts: any[];
	let unpublishedPosts: any[];
	let results: any[];

	$: {
		posts = posts;
		publishedPosts = posts.filter((post: { published: any }) => post.published);
		unpublishedPosts = posts.filter((post: { published: any }) => !post.published);
	}

	$: {
		console.log($searchPostResults);
		if ($searchPostResults !== null) {
			posts = $searchPostResults;
		}
	}
</script>

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

			<Button href="/admin/app/post" size="sm" class="h-8 gap-1">
				<CirclePlus class="h-3.5 w-3.5" />
				<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Create Post</span>
			</Button>
		</div>
	</div>
	<Tabs.Content value="all">
		<AllPosts {posts} />
	</Tabs.Content>
	<Tabs.Content value="published">
		{#key posts}
			<Published posts={publishedPosts} />
		{/key}
	</Tabs.Content>
	<Tabs.Content value="unpublished">
		<UnPublished posts={unpublishedPosts} />
	</Tabs.Content>
</Tabs.Root>
