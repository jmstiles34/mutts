<script lang="ts">
	import { onMount } from 'svelte';
	import type { Dog, SearchResponse, MatchResponse } from '$lib/types';
	import DogCard from '$lib/components/DogCard.svelte';
	import MatchCard from '$lib/components/MatchCard.svelte';
	import Breeds from '$lib/components/filters/Breeds.svelte';
	import AgeRange from '$lib/components/filters/AgeRange.svelte';
	import SortBy from '$lib/components/filters/SortBy.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	let { data } = $props();
	let breeds: string[] = $state(data.breeds);
	let dogs: Dog[] = $state([]);
	let selectedBreeds: Set<string> = $state(new Set());
	let favorites: Set<Dog> = $state(new Set());
	let currentPage: number = $state(1);
	let totalPages: number = $state(0);
	let itemsPerPage: number = $state(25);
	let totalItems: number = $state(0);
	let pages: number[] = $state([]);
	let sortOrder: 'asc' | 'desc' = $state('asc');
	let matchedDogId: string | null = $state(null);
	let loading: boolean = $state(true);
	let error: string = $state('');
	let minAge = $state('');
	let maxAge = $state('');
	let ageError = $state('');
	let sortField = $state('breed');
	let activeTab = $state('search');

	onMount(async () => {
		await searchDogs();
	});

	$effect(() => {
		const pageNumbers = [];
		const maxVisiblePages = 5;

		let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		pages = pageNumbers;
	});

	function buildSearchString(): string {
		let searchString = `sort=${sortField}:${sortOrder}`;
		if (selectedBreeds.size) {
			searchString +=
				'&' + [...selectedBreeds].map((breed) => `breeds[]=${encodeURIComponent(breed)}`).join('&');
		}

		if (parseInt(minAge) > 0) {
			searchString += `&ageMin=${minAge}`;
		}
		if (parseInt(maxAge) > 0) {
			searchString += `&ageMax=${maxAge}`;
		}

		if (currentPage > 1) {
			searchString += `&from=${(currentPage - 1) * itemsPerPage}`;
		}

		return searchString;
	}

	async function searchDogs(): Promise<void> {
		loading = true;
		try {
			const response = await fetch(`/api/dogs/search?${buildSearchString()}`, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			// if api access unauthorized then bounce to login screen
			if (response.status === 401) {
				window.location.href = '/';
			}

			const { resultIds, total }: SearchResponse = await response.json();

			if (resultIds.length) {
				const dogsResponse = await fetch('/api/dogs', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(resultIds),
					credentials: 'include'
				});

				dogs = await dogsResponse.json();
				totalItems = total;
				totalPages = Math.ceil(total / 25);
			} else {
				dogs = [];
			}
		} catch (err) {
			error = 'Failed to fetch dogs';
		} finally {
			loading = false;
		}
	}

	async function generateMatch(): Promise<void> {
		if (favorites.size === 0) {
			error = 'Please favorite at least one dog first';
			return;
		}

		const dogIds = [...favorites].map((fav) => fav.id);

		try {
			const response = await fetch('/api/dogs/match', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(dogIds),
				credentials: 'include'
			});

			const { match }: MatchResponse = await response.json();
			matchedDogId = match;
			scrollToCard(match);
		} catch (err) {
			error = 'Failed to generate match';
		}
	}

	function scrollToCard(id: string): void {
		const card = document.getElementById(`dog-${id}`);
		if (card) {
			card.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	function toggleBreed(breed: string): void {
		if (selectedBreeds.has(breed)) {
			selectedBreeds.delete(breed);
		} else {
			selectedBreeds.add(breed);
		}
		selectedBreeds = new Set(selectedBreeds);
	}

	function toggleFavorite(dog: Dog): void {
		if (favorites.has(dog)) {
			favorites.delete(dog);
		} else {
			favorites.add(dog);
		}
		favorites = new Set(favorites);
	}

	function updateAgeRange(min:string, max:string, error:string): void {
		minAge = min;
		maxAge = max;
		ageError = error
	}

	function updateSortBy(field:string, order:'asc' | 'desc'): void {
		sortField = field;
		sortOrder = order;
	}

	async function handlePageChange(newPage: number): Promise<void> {
		if (newPage < 1 || newPage > totalPages) return;

		currentPage = newPage;
		searchDogs();
	}
</script>

<section>
	<div class="filters">
		<Breeds breeds={breeds} selectedBreeds={selectedBreeds} toggleBreed={toggleBreed} />
		<AgeRange ageError={ageError} minAge={minAge} maxAge={maxAge} updateAgeRange={updateAgeRange} />
		<SortBy sortField={sortField} sortOrder={sortOrder} updateSortBy={updateSortBy}/>

		<button class="search-button" onclick={() => (ageError ? {} : searchDogs())}
			>Apply Filters</button
		>
	</div>

	<div class="search-results">
		{#if error}
			<p class="error">{error}</p>
		{/if}

		<div class="tabs">
			<button class={activeTab === 'search' ? 'active' : ''} onclick={() => (activeTab = 'search')}>
				Search Results
			</button>
			<button
				class={activeTab === 'favorites' ? 'active' : ''}
				onclick={() => (activeTab = 'favorites')}
			>
				Favorite Dogs ({favorites.size})
			</button>
		</div>

		{#if loading}
			<p class="loading">Loading dogs...</p>
		{:else if activeTab === 'favorites'}
			{#if favorites.size}
				<div class="dogs-grid">
					<MatchCard generateMatch={generateMatch}/>
					{#each [...favorites] as dog}
						<DogCard {dog} {matchedDogId} {favorites} {toggleFavorite} />
					{/each}
				</div>
			{:else}
				<p>No favorites selected...</p>
			{/if}
		{:else}
			<div class="pagination-info">
				Showing {(currentPage - 1) * itemsPerPage + 1} -
				{Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} dogs
			</div>
			<div class="dogs-grid">
				{#each dogs as dog}
					<DogCard {dog} {favorites} {toggleFavorite} />
				{/each}
			</div>

			<Pagination currentPage={currentPage} handlePageChange={handlePageChange} pages={pages} totalPages={totalPages} />
		{/if}
	</div>
</section>

<style>
	section {
		display: grid;
		grid-template-columns: 250px 1fr;
		height: calc(100vh - 100px);
	}

	.search-button {
		padding: 0.5rem 1rem;
		background-color: var(--color-burgundy);
		color: var(--color-white);
		border-radius: 4px;
		text-align: center;

		&:hover {
			background-color: var(--color-green);
		}
	}

	.filters {
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--color-border);
		padding: 1rem;
	}

	.search-results {
		height: 100%;
		overflow: auto;
		padding-bottom: 1rem;
	}

	.tabs {
		display: flex;
		margin: 1rem;
		gap: 0.25rem;
		border-bottom: 1px solid var(--color-brown-700);
	}

	.tabs button {
		padding: 10px 20px;
		background-color: var(--color-secondary-bg);
		color: var(--color-black);
		font-size: 16px;
		font-weight: bold;
		border-radius: 5px 5px 0 0;
		transition: background-color 0.3s ease;
	}

	.tabs button.active {
		background-color: var(--color-brown-500);
		color: var(--color-white);
	}

	.tabs button:hover {
		background-color: var(--color-burgundy);
		color: var(--color-white);
	}

	.dogs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
		margin: 1.5rem;
	}

	.error {
		color: var(--color-red-500);
		text-align: center;
		margin: 1rem 0;
	}

	.loading {
		text-align: center;
		color: #6c757d;
		margin: 2rem 0;
	}
	.pagination-info {
		color: var(--color-black);
		font-size: var(--h5);
		margin-left: 1.5rem;
		text-align: center;
	}
</style>
