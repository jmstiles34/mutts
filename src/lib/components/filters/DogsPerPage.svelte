<script lang="ts">
	import { filters } from '$lib/state/filters.svelte';

	type PerPageProps = {
		handleItemsPerPageChange: (e:Event) => void;
	};

	let { handleItemsPerPageChange }: PerPageProps = $props();
</script>

<div class="wrapper">
	Dogs per page:
	<select bind:value={filters.itemsPerPage} onchange={handleItemsPerPageChange}>
		<option value={10}>10</option>
		<option value={15}>15</option>
		<option value={20}>20</option>
		<option value={25}>25</option>
		<option value={50}>50</option>
	</select>
</div>

<style>
	.wrapper {
		color: var(--color-black);
		font-size: var(--h5);
	}

	select {
		margin-bottom: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 0 8px;
	}
</style>
