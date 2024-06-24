<script>
	import * as Card from '$lib/components/ui/card/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Table from '$lib/components/ui/table/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Ellipsis } from 'lucide-svelte';
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import { PUBLIC_DB_URL } from '$env/static/public';
	import { searchPostTerm } from '$lib/stores/searchStore';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { invalidateAll } from '$app/navigation';
	import { onMount } from 'svelte';
	dayjs.extend(relativeTime);
	export let posts;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Published Posts</Card.Title>
		<Card.Description
			>Your unpublished posts will appear here, you can publish them through the menu</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="hidden w-[100px] sm:table-cell">
						<span class="sr-only">Image</span>
					</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head class="hidden md:table-cell">Authour</Table.Head>
					<Table.Head class="hidden md:table-cell">Created at</Table.Head>
					<Table.Head class="hidden md:table-cell">Last edited</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each posts.filter((post) => !post.published) as post (post.id)}
					<Table.Row>
						<Table.Cell class="hidden sm:table-cell">
							<img
								alt="Product example"
								class="aspect-square rounded-md object-cover"
								height="64"
								src={`${PUBLIC_DB_URL}/api/files/${post.collectionId}/${post.id}/${post.image}`}
								width="64"
							/>
						</Table.Cell>
						<Table.Cell class="font-medium">{post.title}</Table.Cell>
						<Table.Cell>
							{#if post.published}
								<Badge variant="secondary">Published</Badge>
							{:else}
								<Badge variant="destructive">Unpublished</Badge>
							{/if}
						</Table.Cell>
						<Table.Cell class="hidden md:table-cell">{post.author}</Table.Cell>
						<Table.Cell class="hidden md:table-cell"
							>{dayjs(post.created).format('DD/MM/YY h:m A')}</Table.Cell
						>
						<Table.Cell class="hidden first-letter:capitalize md:table-cell"
							>{dayjs().from(dayjs(post.updated), true)} ago</Table.Cell
						>
						<Table.Cell>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger asChild let:builder>
									<Button aria-haspopup="true" size="icon" variant="ghost" builders={[builder]}>
										<Ellipsis class="h-4 w-4" />
										<span class="sr-only">Toggle menu</span>
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content align="end">
									<DropdownMenu.Label>Actions</DropdownMenu.Label>
									<DropdownMenu.Item href={`/admin/app/post/${post.id}`} class="Item"
										>Edit</DropdownMenu.Item
									>
									{#if !post.published}
										<DropdownMenu.Item>
											<form
												action="?/publish-post-from-list"
												method="POST"
												use:enhance={() => {
													// return ({ update }) =>

													return async ({ result, update }) => {
														if (result.status === 200) {
															toast.success('Post published successfully');
															post.published = true;
															invalidateAll();
														} else {
															toast.error('Failed to publish post');
														}
													};
												}}
											>
												<button type="submit">Publish</button>
												<input type="text" name="id" class="hidden" bind:value={post.id} />
											</form>
										</DropdownMenu.Item>
									{:else}
										<DropdownMenu.Item>
											<form
												action="?/unpublish-post-from-list"
												method="POST"
												use:enhance={() => {
													return async ({ result, update }) => {
														update({ invalidateAll: true });
														if (result.status === 200) {
															toast.info('Post upublished successfully');
															post.published = false;
															invalidateAll();
														} else {
															toast.error('Failed to publish post');
														}
													};
												}}
											>
												<button type="submit">Unpublish</button>
												<input type="text" name="id" class="hidden" bind:value={post.id} />
											</form>
										</DropdownMenu.Item>
									{/if}
									<form
										method="POST"
										action="?/delete-post-from-list"
										use:enhance={() => {
											return async ({ result, update }) => {
												update({ invalidateAll: true });
												if (result.status === 200) {
													toast.success('Post deleted successfully');
													invalidateAll();
												} else {
													toast.error('Failed to delete post');
												}
											};
										}}
									>
										<input type="text" name="id" class="hidden" bind:value={post.id} />
										<DropdownMenu.Item><button type="submit">Delete</button></DropdownMenu.Item>
									</form>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
