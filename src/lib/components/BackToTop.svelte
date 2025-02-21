<script lang="ts">
	import { onMount } from 'svelte';

	let showButton = false;
	let searchResults: Element | null = null;
	const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const handleScroll = () => {
		if (searchResults) {
			const scrollPosition = searchResults.scrollTop;
			const halfway = searchResults.scrollHeight / 4;
			showButton = scrollPosition > halfway;
		}
	};

	const scrollToTop = () => {
		searchResults?.scrollTo({
			top: 0,
			behavior: prefersReducedMotion ? 'auto' : 'smooth'
		});
	};

	onMount(() => {
		searchResults = document.querySelector('.search-results');
		searchResults?.addEventListener('scroll', handleScroll);

		return () => {
			searchResults?.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<button
	class="back-to-top"
	on:click={scrollToTop}
	style:display={showButton ? 'block' : 'none'}
	aria-label="Scroll to top"
>
	<i class="fa-solid fa-arrow-up fa-xl"></i>
</button>

<style>
	button {
		position: fixed;
		bottom: 2rem;
		right: 2rem;
		background-color: var(--color-burgundy);
		color: var(--color-white);
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		border: none;
		cursor: pointer;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		font-size: 1.5rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
		z-index: 1000;
		transition:
			background-color 0.2s ease,
			transform 0.2s ease;
	}

	button:hover {
		background-color: var(--color-olive);
		transform: translateY(-2px);
	}

	button:active {
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		button {
			bottom: 1rem;
			right: 1rem;
			width: 2.5rem;
			height: 2.5rem;
			font-size: 1.25rem;
		}
	}
</style>
