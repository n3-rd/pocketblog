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
	import TabsUI from '$lib/components/layout/TabsUI.svelte';
</script>

<div class="flex min-h-screen w-full flex-col bg-muted/40">
	<SideNav />
	<div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
		<!-- <Header user={data.user} /> -->
		<main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
			<slot />
		</main>
	</div>
</div>
