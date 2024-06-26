<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Textarea } from '$lib/components/ui/textarea';
	import { slugify } from '$lib/slugify';
	import { Dot, Info, MoreHorizontal } from 'lucide-svelte';
	import { Carta, MarkdownEditor, type Icon } from 'carta-md';
	import DOMPurify from 'isomorphic-dompurify';
	import 'carta-md/default.css'; /* Default theme */
	import { emoji } from '@cartamd/plugin-emoji';
	import { slash } from '@cartamd/plugin-slash';
	import { code } from '@cartamd/plugin-code';
	import '@cartamd/plugin-code/default.css';
	import { onMount } from 'svelte';
	import { enabledIcons } from '$lib/components/editorIcons';
	import * as Popover from '$lib/components/ui/popover';
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Loader from '$lib/components/ui/Loader.svelte';
	import { goto, invalidateAll } from '$app/navigation';
	import * as Dialog from '$lib/components/ui/dialog';
	import TagInput from '$lib/components/layout/posts/TagInput.svelte';

	export let data;
	export let form;
	const post = data?.post;
	console.log('data', data);

	const carta = new Carta({
		sanitizer: DOMPurify.sanitize,
		disableIcons: true,

		extensions: [
			{
				icons: enabledIcons
			},

			emoji(),
			slash(),
			code({
				onError: () => {}
			})
		]
	});

	let title: string = post.title || '';
	let slug: string = post.slug || '';
	let description = post.description || '';
	let content: string = post.content || '';
	let published = post.published || false;
	let tags: any;
	let loading = false;
	let keywords: never[] = post.keywords.split(', ') || [];
	let keyValues: string;

	$: {
		keyValues = keywords.map((k) => k).join(', ');
		tags = data?.tags;
	}

	const generateSlug = () => {
		slug = slugify(title);
	};

	const fixCarta = () => {
		const classes = ['prose'];
		const cartaRenderer = document.querySelector('.carta-renderer');
		classes.forEach((c) => {
			cartaRenderer?.classList.add(c);
		});
	};

	$: {
		if (form?.success) {
			toast.success('Post created successfully');
		}
	}

	onMount(() => {
		fixCarta();
		const toolbar = document.querySelector('.carta-toolbar-left');
		toolbar?.addEventListener('click', () => {
			fixCarta();
		});
	});
</script>

<form
	method="POST"
	action="?/edit-post"
	class="container flex flex-col items-center gap-4 pb-40 pt-14 text-left"
	enctype="multipart/form-data"
	use:enhance={() => {
		return async ({ result, update }) => {
			if (result.status === 200) {
				toast.success('Post updated successfully');
				goto('/admin/app/');
			} else {
				toast.error('Failed to update post');
			}
		};
	}}
>
	<div class="flex w-full max-w-[1200px] flex-col items-center gap-16">
		<!-- title preview -->
		<h1 class="self-start text-4xl font-bold capitalize text-muted-foreground">
			{#if title == ''}
				Title
			{:else}
				{title}
			{/if}
		</h1>

		<!-- title -->

		<div class="flex w-full flex-col gap-1.5">
			<Label for="title" class="font-bold text-muted-foreground">Title</Label>
			<Input type="text" id="title" name="title" bind:value={title} />
		</div>
		<!-- slug -->
		<div class="flex w-full flex-col gap-1.5">
			<div class="flex items-center gap-1">
				<Label for="slug" class="font-bold text-muted-foreground ">slug</Label>
				<Tooltip.Root>
					<Tooltip.Trigger><Info size="14" /></Tooltip.Trigger>
					<Tooltip.Content>
						<p>slug must be <code>kebab-case</code></p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>

			<div class="flex gap-1">
				<Input
					type="text"
					id="slug"
					name="slug"
					bind:value={slug}
					on:keyup={(event) => {
						if (event.key === ' ') {
							slug += '-';
						}
						slug = slugify(slug);
					}}
				/>
				<Button variant="secondary" on:click={() => generateSlug()}>Generate</Button>
			</div>
			{#if slug == ''}
				<p class="text-red-400">Slug cannot be empty</p>
			{/if}
		</div>

		<!-- description -->
		<div class="flex w-full flex-col gap-1.5">
			<Label for="description" class="font-bold text-muted-foreground">Description</Label>
			<Textarea
				placeholder="Type post description here."
				name="description"
				bind:value={description}
			/>
		</div>

		<!-- tags -->
		<div class="tags flex w-full flex-col gap-2">
			{#each tags as tag}
				<div class="flex w-full flex-row items-center gap-1.5">
					<Checkbox id={tag.id} bind:checked={tag.checked} />
					<input
						type="checkbox"
						id={tag.id}
						name="tags"
						value={tag.id}
						bind:checked={tag.checked}
						class="hidden"
					/>
					<Label
						for={tag.id}
						class="text-lg font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{tag.name}
					</Label>
				</div>
			{/each}

			<div class="w-full">
				<Dialog.Root>
					<Dialog.Trigger>
						<Button variant="secondary">Add new tag</Button>
					</Dialog.Trigger>
					<Dialog.Content>
						<form
							method="POST"
							action="?/add-tag"
							use:enhance={() => {
								return async ({ result, update }) => {
									invalidateAll();
									if (result.status === 200) {
										toast.success('Tag added successfully');
									} else {
										toast.error('Failed to add tag');
									}
								};
							}}
						>
							<Dialog.Header>
								<Dialog.Title>Add new tag</Dialog.Title>
								<Dialog.Description>
									<Input type="text" placeholder="Type tag name here" name="tag" />
									<Dialog.Close>
										<Button variant="default" type="submit" class="mt-4 w-full">Add tag</Button>
									</Dialog.Close>
								</Dialog.Description>
							</Dialog.Header>
						</form>
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
		<!-- keywords -->
		<div class="flex w-full flex-col gap-1.5">
			<Label for="keywords" class="font-bold text-muted-foreground"
				>Keywords (separate with commas)</Label
			>
			<TagInput bind:value={keywords} />

			<div class="hidden">
				<input name="keywords" bind:value={keyValues} type="text" class="text-white" />
			</div>
		</div>

		<!-- main image -->
		<div class="flex w-full flex-col gap-1.5">
			<Label for="picture">Picture</Label>
			<Input
				id="picture"
				type="file"
				class="border-dashed"
				name="image"
				multiple={false}
				accept="image/*"
			/>
		</div>

		<!-- content -->
		<div class=" flex w-full flex-col gap-1.5">
			<Label for="keywords" class="font-bold text-muted-foreground"
				>Content (separate with commas)</Label
			>
			<MarkdownEditor {carta} bind:value={content} mode="auto" />
		</div>
	</div>

	<div
		class="fixed inset-x-0 bottom-0 flex h-14 min-w-full justify-between border-t-2 bg-background px-4"
	>
		<div class="published-status flex items-center gap-2">
			<div class="beacon text-4xl text-muted-foreground"><Dot /></div>
			<p>Not published</p>
			<p>Edited 33 sec. ago</p>
		</div>

		<div class="actions flex items-center gap-2">
			<Dialog.Root>
				<Dialog.Trigger>
					<Button
						class="flex items-center gap-2 px-6 hover:text-red-500"
						on:click={(e) => {
							e.preventDefault();
						}}
						variant="outline"
					>
						<p>Cancel</p>
					</Button>
				</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
						<Dialog.Description>
							This action cannot be undone. This will permanently discard any changes you have made.
						</Dialog.Description>
					</Dialog.Header>
					<Dialog.Footer>
						<Button
							variant="outline"
							class="border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-inherit hover:text-red-500"
							on:click={() => {
								goto('/admin/app/');
							}}
						>
							Discard
						</Button>
						<Dialog.Close>
							<Button class="flex items-center gap-2 px-6">Cancel</Button>
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
			<Button class="flex items-center gap-2" type="submit">
				<p>Update</p>
				{#if loading}
					<Loader />
				{/if}
			</Button>

			<Popover.Root>
				<Popover.Trigger>
					<Button variant="ghost">
						<MoreHorizontal />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="max-w-56">
					<div class="flex flex-col gap-2">
						{#if published}
							<form method="POST" action="?/unpublish-post">
								<Button type="submit" formaction="?/unpublish-post" variant="outline"
									>Unpublish</Button
								>
							</form>
						{:else}
							<form method="POST" action="?/publish-post">
								<Button type="submit" formaction="?/publish-post" variant="outline">Publish</Button>
							</form>
						{/if}
						<form method="POST" action="?/delete-post">
							<Button
								type="submit"
								variant="outline"
								class="border-red-500 text-red-500 hover:bg-red-500 hover:text-inherit"
								>Delete</Button
							>
						</form>
					</div>
				</Popover.Content>
			</Popover.Root>
		</div>
	</div>
</form>
