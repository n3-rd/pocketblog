<script lang="ts">
	export let data;
	const user = data.user;

	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let currUrl = $page.url.pathname;

	// onMount(() => {
	// 	if (
	// 		!user &&
	// 		currUrl != '/admin/register' &&
	// 		currUrl != '/admin/login' &&
	// 		currUrl == '/admin/app'
	// 	) {
	// 		goto('/admin/login');
	// 	} else {
	// 		goto('/admin/app');
	// 	}
	// });
</script>

<slot />
