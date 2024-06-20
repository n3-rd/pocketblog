<script>
	// @ts-nocheck

	import { Button } from '$lib/components/ui/button/index';

	import { Input } from '$lib/components/ui/input/index';

	/**
	 * @type {any[]}
	 */
	export let value = []; // tag list
	/**
	 * @type {any[]}
	 */
	export let list = []; // a list of tag suggestion
	let input = ''; // input value

	// pressed checks keyboard event for comma or Enter key.
	// If found, adds 'value' in the tag list.
	// REM: On the 'blur' event, if we exit the field with
	//      someting inside, consider it as a tag.
	/**
	 * @param {{ type: string; key: string; }} ev
	 */
	function pressed(ev) {
		// Check if conditions are met to do something.
		// If not, exit as early as possible.
		if (ev.type !== 'blur' && ev.key !== ',' && ev.key !== 'Enter') return;

		// Clean the remaining comma in input.
		input = input.replace(',', '');

		// If nothing left, we do nothing and exit.
		if (input === '') return;

		// If we are here, we can add the tag to our list...
		// ... and clean the input for the next one.
		value = [...value, input];
		input = '';
	}

	// del deletes the 'idx' entry from the tag list.
	/**
	 * @param {number} idx
	 */
	function del(idx) {
		value.splice(idx, 1); // Remove the idx'th entry.
		value = value; // Refresh for reactivity.
	}
</script>

<main class="w-full">
	<Input
		list="tag_suggestion"
		on:blur={pressed}
		on:keyup={pressed}
		bind:value={input}
		class="w-full"
	/>
	<div class="flex items-center gap-3 py-2">
		{#each value as t, i}
			<Button variant="secondary" class="flex items-center gap-2">
				<span>{t}</span> <a href="#del" on:click={() => del(i)}>⨉</a>
			</Button>
			<!-- <span class="tag"> </span> -->
		{/each}
	</div>
	<datalist id="tag_suggestion">
		{#each list as ts}
			<option>{ts}</option>
		{/each}
	</datalist>
</main>
