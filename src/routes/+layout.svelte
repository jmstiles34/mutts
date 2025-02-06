<script lang="ts">
	import { page } from '$app/state';
	import '../styles.css';
	import { session } from '$lib/state/session.svelte';

	let { children } = $props();

	async function handleLogout(): Promise<void> {
		await fetch('/api/auth/logout', {
			method: 'POST',
			credentials: 'include'
		});
		session.clearSession();
		window.location.href = '/';
	}
</script>

<svelte:head>
	<title>{page.data.title ?? 'Mutts & Matches'}</title>
	<meta name="description" content="A matchmaking service for mutts!" />
</svelte:head>

<main>
	<header>
		<div class="logo-group">
			<img
				src="/bulldog.svg"
				alt="Red speech bubble with word 'hi' inside followed by red word marley"
			/>
			<h1>Mutts & Matches</h1>
		</div>
		{#if page.url.pathname === '/search'}
			<button class="logout-button" onclick={handleLogout}>Logout</button>
		{/if}
	</header>
	<div class="wrapper">
		{@render children()}
	</div>
</main>

<style>
	main {
		display: grid;
		grid-template-rows: 100px 1fr;
		height: 100vh;
		overflow: hidden;
	}

	header {
		display: flex;
		color: var(--color-black);
		align-items: center;
		background-color: var(--color-brown-500);
		padding: 0.5rem;
		gap: 1rem;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
		justify-content: space-between;
	}

	.logo-group {
		display: flex;
		align-items: center;
		gap: 1rem;
		height: 100%;
		img {
			height: 100%;
		}
	}

	.logout-button {
		padding: 0.5rem 1rem;
		margin-right: 0.5rem;
		background-color: var(--color-burgundy);
		color: var(--color-white);
		border-radius: 4px;
		width: fit-content;
		justify-self: end;

		&:hover {
			background-color: var(--color-green);
		}
	}

	.wrapper {
		height: calc(100vh - 100px);
	}
</style>
