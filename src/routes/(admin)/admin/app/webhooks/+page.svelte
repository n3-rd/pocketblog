<script>
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowUpRight, Link } from 'lucide-svelte';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge/index';
</script>

<div class="container flex flex-col gap-4 py-4">
	<div class="flex flex-col gap-1">
		<h1>Webhooks</h1>
		<p>Create and manage custom webhooks</p>
	</div>
	<div class="flex w-full items-center justify-between">
		<div class="flex items-center gap-1 text-indigo-600">
			<a href="##">Learn more about webhooks</a>
			<ArrowUpRight size="16" />
		</div>
		<Button href="/admin/app/webhooks/new" color="primary">Create Webhook</Button>
	</div>

	<div class="webhooks-container grid grid-cols-1 gap-4 lg:grid-cols-2">
		<div>
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex w-full items-center justify-between">
						<h1 class="text-xl">Webhook 1</h1>
						<Button size="sm" color="primary">Edit webhook</Button>
					</Card.Title>
					<Card.Description class="line-clamp-3 text-lg lg:max-w-[80%]">
						Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<div class="flex items-center gap-1 text-sm text-muted-foreground">
						<Link size="16" />
						<p>https://example.com/webhook</p>
					</div>
				</Card.Content>
				<Card.Footer class="flex items-center gap-6">
					<div class="flex flex-col gap-2">
						<h3 class="text-sm font-semibold text-muted-foreground">Created</h3>
						<p class="text-base">2 days ago</p>
					</div>
					<div class="flex flex-col gap-2">
						<h3 class="text-sm font-semibold text-muted-foreground">Status</h3>
						<Badge class="bg-green-700">Enabled</Badge>
					</div>
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
</div>
