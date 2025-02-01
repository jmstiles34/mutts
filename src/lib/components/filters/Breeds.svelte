<script lang="ts">
	import { filters } from '$lib/state/filters.svelte';

	type BreedsProps = {
		breeds: string[];
	};

	let { breeds }: BreedsProps = $props();

	function toggleBreed(breed: string): void {
		if (filters.selectedBreeds.has(breed)) {
			filters.selectedBreeds.delete(breed);
		} else {
			filters.selectedBreeds.add(breed);
		}
		filters.selectedBreeds = new Set(filters.selectedBreeds);
	}
</script>

<div class="filter-section">
	<h3>Breeds</h3>
	<div class="breed-list">
		{#each breeds as breed}
			<label class="breed-item">
				<input
					type="checkbox"
					checked={filters.selectedBreeds.has(breed)}
					onchange={() => toggleBreed(breed)}
				/>
				{breed}
			</label>
		{/each}
	</div>
</div>

<style>
  .filter-section {
		margin-bottom: 1.5rem;
	}

	h3 {
		font-size: var(--h5);
		margin-bottom: 0.5rem;
	}

	.breed-list {
		max-height: 300px;
		overflow-y: auto;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		padding: 0.5rem;
	}

	.breed-item {
		display: block;
		padding: 0.25rem 0;
	}
</style>
