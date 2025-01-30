<script lang="ts">
  type MatchCardProps = {
		generateMatch: () => void;
	};

  let { generateMatch }: MatchCardProps = $props();
</script>

<div class="match-card">
	<h3>Match Maker</h3>
	<p>
		Wow, look at all these amazing mutts you've selected! Any one of them could be your new
		best friend. Ready to discover your perfect match?
	</p>
	<button onclick={generateMatch}> Show Me My Mutt! </button>
</div>

<style>
	.match-card {
		background-color: var(--color-white);
		padding: 1rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
    display: flex;
		flex-direction: column;
		gap: 1rem;
		height: 100%;
	}

	h3 {
		font-size: var(--h5);
		color: var(--color-black);
	}

	p {
		margin: 0.25rem 0;
		color: var(--color-black);
	}

	button {
		padding: 1rem 0.5rem;
		background-color: #28a745;
		color: var(--color-white);
		border: none;
		border-radius: 4px;
		font-size: var(--20px);
		width: 100%;
		text-align: center;
		margin-top: auto;
		justify-self: end;

    &:hover {
      background-color: var(--color-olive);
    }
	}
</style>
