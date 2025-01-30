<script lang="ts">
	type PaginationProps = {
		currentPage: number;
		pages: number[];
    totalPages: number,
		handlePageChange: (b: number) => void;
	};

	let { currentPage, handlePageChange, pages, totalPages }: PaginationProps = $props();
</script>

<div class="pagination-container">
	<div class="pagination">
		<button
			class="pagination-button"
			disabled={currentPage === 1}
			onclick={() => handlePageChange(1)}
		>
			«
		</button>

		<button
			class="pagination-button"
			disabled={currentPage === 1}
			onclick={() => handlePageChange(currentPage - 1)}
		>
			‹
		</button>

		{#each pages as pageNum}
			<button
				class="pagination-button {pageNum === currentPage ? 'active' : ''}"
				onclick={() => handlePageChange(pageNum)}
			>
				{pageNum}
			</button>
		{/each}

		<button
			class="pagination-button"
			disabled={currentPage === totalPages}
			onclick={() => handlePageChange(currentPage + 1)}
		>
			›
		</button>

		<button
			class="pagination-button"
			disabled={currentPage === totalPages}
			onclick={() => handlePageChange(totalPages)}
		>
			»
		</button>
	</div>
</div>

<style>
	.pagination-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		padding: .5rem;
	}

	.pagination {
		display: flex;
		gap: 0.5rem;
		align-items: center;
	}

	.pagination-button {
		padding: 0.5rem 1rem;
		border: 1px solid var(--color-border);
		background-color: var(--color-white);
		cursor: pointer;
		border-radius: 4px;
		min-width: 2.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.pagination-button:hover:not(:disabled) {
		background-color: #f0f0f0;
		border-color: #bbb;
	}

	.pagination-button:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.pagination-button.active {
		background-color: var(--color-olive);
		color: white;
		border-color: var(--color-olive);
	}
</style>
