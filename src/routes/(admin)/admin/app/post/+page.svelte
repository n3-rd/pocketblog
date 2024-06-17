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

	let title: string = '';
	let slug: string = '';
	let description = '';
	let content: string = ``;

	const generateSlug = () => {
		slug = slugify(title);
	};

	$: {
		fixCarta();
	}

	const fixCarta = () => {
		const classes = ['prose'];
		const cartaRenderer = document.querySelector('.carta-renderer');
		classes.forEach((c) => {
			cartaRenderer?.classList.add(c);
		});
	};
	onMount(() => {
		fixCarta();
		const toolbar = document.querySelector('.carta-toolbar-left');
		toolbar?.addEventListener('click', () => {
			fixCarta();
		});
	});
</script>

<div class="container flex flex-col items-center gap-4 pb-40 pt-14 text-left">
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
		<div class="flex w-full flex-row items-center gap-1.5">
			<Checkbox id="terms1" />
			<Label
				for="terms1"
				class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Typescript
			</Label>
		</div>

		<!-- keywords -->
		<div class="flex w-full flex-col gap-1.5">
			<Label for="keywords" class="font-bold text-muted-foreground"
				>Keywords (separate with commas)</Label
			>
			<Input type="text" id="keywords" name="keywords" />
		</div>

		<!-- main image -->
		<div class="flex w-full flex-col gap-1.5">
			<Label for="picture">Picture</Label>
			<Input id="picture" type="file" class="border-dashed " />
		</div>

		<!-- content -->
		<div class=" flex w-full flex-col gap-1.5">
			<Label for="keywords" class="font-bold text-muted-foreground"
				>Content (separate with commas)</Label
			>
			<MarkdownEditor {carta} bind:value={content} mode="tabs" />
		</div>
	</div>

	<div class="fixed inset-x-0 bottom-0 flex h-14 min-w-full justify-between px-4">
		<div class="published-status flex items-center gap-2">
			<div class="beacon text-4xl text-muted-foreground"><Dot /></div>
			<p>Not published</p>
			<p>Edited 33 sec. ago</p>
		</div>

		<div class="actions flex items-center gap-2">
			<Button>Publish</Button>
			<Button variant="ghost">
				<MoreHorizontal />
			</Button>
		</div>
	</div>
</div>
