<script lang="ts">
	import { filters } from '$lib/state/filters.svelte';

	type BreedsProps = {
		breeds: string[];
	};

	let { breeds }: BreedsProps = $props();
	let filteredBreeds: string[] = $state(breeds);
	let searchTerm: string = $state('');

	$effect(() => {
		filteredBreeds = searchTerm
			? breeds.filter((breed) => breed.toLowerCase().includes(searchTerm.toLowerCase()))
			: breeds;
	})

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
	<div class="search-container">
    <input
      type="text"
      placeholder="Search breeds..."
      bind:value={searchTerm}
      class="search-input"
    />
  </div>
	<div class="breed-list">
		{#if filteredBreeds.length}
		{#each filteredBreeds as breed}
			<label class="breed-item">
				<input
					type="checkbox"
					checked={filters.selectedBreeds.has(breed)}
					onchange={() => toggleBreed(breed)}
				/>
				{breed}
			</label>
		{/each}
		{:else}
			No matching breeds.
		{/if}
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

	.search-container {
		margin-bottom: 0.5rem;
	}

	.search-input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
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
