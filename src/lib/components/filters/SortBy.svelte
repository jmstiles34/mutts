<script lang="ts">
	type SortByProps = {
		sortField: string;
		sortOrder: 'asc' | 'desc';
		updateSortBy: (a: string, b: 'asc' | 'desc') => void;
	};

	let { sortField, sortOrder, updateSortBy }: SortByProps = $props();
</script>

<div class="filter-section">
	<h3>Sort By</h3>
	<select bind:value={sortField} onchange={() => updateSortBy(sortField, sortOrder)}>
		<option value="name">Name</option>
		<option value="breed">Breed</option>
		<option value="age">Age</option>
	</select>

	<div class="sort-order">
		<label class="radio-label">
			<input
				type="radio"
				name="sortOrder"
				value="asc"
				bind:group={sortOrder}
				onchange={() => updateSortBy(sortField, sortOrder)}
			/>
			Ascending
		</label>
		<label class="radio-label">
			<input
				type="radio"
				name="sortOrder"
				value="desc"
				bind:group={sortOrder}
				onchange={() => updateSortBy(sortField, sortOrder)}
			/>
			Descending
		</label>
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

	select {
		width: 100%;
		padding: 0.5rem;
		margin-bottom: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
	}

	.sort-order {
		display: flex;
		gap: 0.5rem;
		margin-top: 0.5rem;
	}

	.radio-label {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}

	.radio-label input[type='radio'] {
		margin: 0;
	}
</style>
