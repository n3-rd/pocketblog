<script lang="ts">
	import TabsUi from '$lib/components/layout/TabsUI.svelte';
	import { searchPostResults } from '$lib/stores/searchStore';
	export let data;
	console.log(data);
	let search: string;
	let posts: any[] = data.posts;
	let publishedPosts: any[];
	let unpublishedPosts: any[];
	let results: any[];

	$: {
		posts = data.posts;
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

<TabsUi {posts} />
