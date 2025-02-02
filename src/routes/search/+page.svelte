<script lang="ts">
	import { onMount } from 'svelte';
	import type { Dog, SearchResponse, MatchResponse } from '$lib/types';
	import DogCard from '$lib/components/DogCard.svelte';
	import MatchCard from '$lib/components/MatchCard.svelte';
	import Breeds from '$lib/components/filters/Breeds.svelte';
	import AgeRange from '$lib/components/filters/AgeRange.svelte';
	import SortBy from '$lib/components/filters/SortBy.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import BackToTop from '$lib/components/BackToTop.svelte';
	import { filters } from '$lib/state/filters.svelte';
	import { paging } from '$lib/state/paging.svelte';
	import DogsPerPage from '$lib/components/filters/DogsPerPage.svelte';

	let { data } = $props();
	let breeds: string[] = $state(data.breeds);
	let dogs: Dog[] = $state([]);
	let favorites: Set<Dog> = $state(new Set());
	let matchedDogId: string | null = $state(null);
	let loading: boolean = $state(true);
	let error: string = $state('');
	let activeTab = $state('search');

	onMount(async () => {
		await searchDogs();
	});

	$effect(() => {
		const pageNumbers = [];
		const maxVisiblePages = 5;

		let startPage = Math.max(1, paging.currentPage - Math.floor(maxVisiblePages / 2));
		let endPage = Math.min(paging.totalPages, startPage + maxVisiblePages - 1);

		if (endPage - startPage + 1 < maxVisiblePages) {
			startPage = Math.max(1, endPage - maxVisiblePages + 1);
		}

		for (let i = startPage; i <= endPage; i++) {
			pageNumbers.push(i);
		}

		paging.pages = pageNumbers;
	});

	function buildSearchString(): string {
		let searchString = `sort=${filters.sortField}:${filters.sortOrder}&size=${filters.itemsPerPage}`;
		if (filters.selectedBreeds.size) {
			searchString +=
				'&' +
				[...filters.selectedBreeds]
					.map((breed) => `breeds[]=${encodeURIComponent(breed)}`)
					.join('&');
		}

		if (parseInt(filters.minAge) > 0) {
			searchString += `&ageMin=${filters.minAge}`;
		}
		if (parseInt(filters.maxAge) > 0) {
			searchString += `&ageMax=${filters.maxAge}`;
		}

		if (paging.currentPage > 1) {
			searchString += `&from=${(paging.currentPage - 1) * filters.itemsPerPage}`;
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
				paging.totalItems = total;
				paging.totalPages = Math.ceil(total / 25);
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

	function toggleFavorite(dog: Dog): void {
		if (favorites.has(dog)) {
			favorites.delete(dog);
		} else {
			favorites.add(dog);
		}
		favorites = new Set(favorites);
	}

	async function handlePageChange(newPage: number): Promise<void> {
		if (newPage < 1 || newPage > paging.totalPages) return;

		paging.currentPage = newPage;
		searchDogs();
	}
	async function handleItemsPerPageChange(event: Event): Promise<void> {
		const target = event.target as HTMLSelectElement;
		filters.itemsPerPage = Number(target.value);
		searchDogs();
	}

	function handleApplyFilters(): void {
		if (!filters.ageError.length) {
			paging.currentPage = 1;
			searchDogs();
		}
	}
</script>

<section>
	<div class="filters">
		<Breeds {breeds} />
		<AgeRange />
		<SortBy />

		<button class="search-button" onclick={handleApplyFilters}>Apply Filters</button>
		<button
			class="reset-button"
			onclick={() => {
				filters.resetFilters();
				paging.resetPaging();
				searchDogs();
			}}>Reset Filters</button
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
					<MatchCard {generateMatch} />
					{#each [...favorites] as dog}
						<DogCard {dog} {matchedDogId} {favorites} {toggleFavorite} />
					{/each}
				</div>
			{:else}
				<div class="pagination-info">No favorites selected...</div>
			{/if}
		{:else}
			<div class="pagination-info">
				<div>
					Showing {(paging.currentPage - 1) * filters.itemsPerPage + 1} -
					{Math.min(paging.currentPage * filters.itemsPerPage, paging.totalItems)} of {paging.totalItems}
					dogs
				</div>
				<DogsPerPage {handleItemsPerPageChange} />
			</div>
			<div class="dogs-grid">
				{#each dogs as dog}
					<DogCard {dog} {favorites} {toggleFavorite} />
				{/each}
			</div>

			<Pagination {handlePageChange} />
		{/if}
	</div>
</section>

<BackToTop />

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
	.reset-button {
		padding: 0.5rem 1rem;
		background-color: var(--color-secondary-bg);
		border-radius: 4px;
		text-align: center;
		margin-top: 1rem;

		&:hover {
			color: var(--color-white);
			background-color: var(--color-green);
		}
	}

	.filters {
		display: flex;
		flex-direction: column;
		border-right: 1px solid var(--color-border);
		padding: 1rem;
		overflow-y: auto;
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

	.pagination-info {
		display: flex;
		color: var(--color-black);
		font-size: var(--h5);
		margin: 0 1.5rem;
		gap: 0.5rem;
		justify-content: space-between;
	}

	.dogs-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 2rem;
		margin: 0.5rem 1.5rem;
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
</style>
