<script>
	import * as Card from '$lib/components/ui/card/index';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index';
	import * as Table from '$lib/components/ui/table/index';
	import { Badge } from '$lib/components/ui/badge/index';
	import { Button } from '$lib/components/ui/button/index';
	import { Ellipsis } from 'lucide-svelte';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Published Posts</Card.Title>
		<Card.Description>Your published posts will appear here</Card.Description>
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
					<Table.Head class="hidden md:table-cell">Edited at</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product example"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="https://github.com/shadcn.png"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
					<Table.Cell>
						<Badge variant="secondary">Published</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">Godwin</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-07-12 10:42 AM</Table.Cell>
					<Table.Cell class="hidden md:table-cell">2023-07-12 10:42 AM</Table.Cell>
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
								<DropdownMenu.Item>Edit</DropdownMenu.Item>
								<DropdownMenu.Item>Delete</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
