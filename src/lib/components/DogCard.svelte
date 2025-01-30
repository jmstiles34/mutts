<script lang="ts">
	import type { Dog } from '$lib/types';

	type DogCardProps = {
		dog: Dog;
		matchedDogId?: string | null;
		favorites: Set<Dog>;
		toggleFavorite: (d: Dog) => void;
	};

	let { dog, favorites, matchedDogId=null, toggleFavorite }: DogCardProps = $props();
</script>

<div id={`dog-${dog.id}`} class={`dog-card ${matchedDogId === dog.id ? 'matched' : ''}`}>
	<img src={dog.img} alt={dog.name} class="dog-image" />
	<div class="dog-info">
		<h3>{dog.name}</h3>
		<p>Breed: {dog.breed}</p>
		<p>Age: {dog.age} years</p>
		<p>Location: {dog.zip_code}</p>
		<button
			class="favorite-button"
			class:matchFav={matchedDogId === dog.id}
			class:favorited={favorites.has(dog)}
			onclick={() => toggleFavorite(dog)}
		>
			{favorites.has(dog) ? '❤️' : '🤍'}
		</button>
	</div>
</div>

<style>
	.dog-card {
		background-color: var(--color-white);
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
	}

	h3 {
		font-size: var(--h5);
		color: var(--color-black);
	}

	p {
		margin: 0.25rem 0;
		color: var(--color-black);
	}

	.dog-image {
		width: 100%;
		height: 200px;
		object-fit: cover;
	}

	.dog-info {
		padding: 0.5rem;
		padding-bottom: 0;
	}

	.favorite-button {
		font-size: var(--h3);
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background-color: var(--color-white);
		border-radius: 12px;
		height: 40px;
		width: 40px;
		text-align: center;
	}

	.matched {
		background-color: var(--color-yellow);
		transform: scale(1.08);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;

		&:hover {
			transform: scale(1.11);
			box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
		}
	}

	.matchFav {
		background-color: var(--color-yellow);
	}
</style>
