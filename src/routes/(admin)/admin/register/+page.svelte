<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
</script>

<div class="flex h-screen min-w-full items-center justify-center">
	<Card.Root class="mx-auto max-w-sm">
		<Card.Header>
			<Card.Title class="text-xl">Sign Up</Card.Title>
			<Card.Description>Enter your information to create an account</Card.Description>
		</Card.Header>
		<Card.Content>
			<form method="POST" action="?/register">
				<div class="grid gap-4">
					<div class="grid gap-2">
						<Label for="name">First name</Label>
						<Input id="name" name="name" placeholder="Max" required />
					</div>

					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" name="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<Label for="password">Password</Label>
						<Input id="password" name="password" type="password" />
					</div>
					<div class="grid gap-2">
						<Label for="passwordConfirm">Confirm Password</Label>
						<Input id="passwordConfirm" name="passwordConfirm" type="password" />
					</div>
					<Button type="submit" class="w-full">Create an account</Button>
				</div>
			</form>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/admin/login" class="underline"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
</div>
