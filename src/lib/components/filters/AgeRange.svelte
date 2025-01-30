<script lang="ts">
	type AgeRangeProps = {
		ageError: string;
		minAge: string;
		maxAge: string;
    updateAgeRange: (a:string, b:string, c:string) => void
	};

	let { ageError, minAge, maxAge, updateAgeRange }: AgeRangeProps = $props();
  
  $effect(() => {
		if (minAge !== '' && maxAge !== '') {
			if (parseInt(maxAge) < parseInt(minAge)) {
				ageError = 'Maximum age must be greater than minimum age when specified.';
			} else {
				ageError = '';
			}
		} else {
			ageError = '';
		}
	});
</script>

<div class="filter-section">
	<h3>Age Range</h3>
	<div class="age-inputs">
		<label>
			Minimum Age:
			<input
				class={ageError ? 'errorAge' : ''}
				type="number"
				min="0"
				bind:value={minAge}
        oninput={() => updateAgeRange(minAge, maxAge, ageError)}
				placeholder="Enter a Number"
			/>
		</label>
		<label>
			Maximum Age:
			<input
				class={ageError ? 'errorAge' : ''}
				type="number"
				min="0"
				bind:value={maxAge}
        oninput={() => updateAgeRange(minAge, maxAge, ageError)}
				placeholder="Enter a Number"
			/>
		</label>
		{#if ageError}
			<div class="error-message">
				{ageError}
			</div>
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

	.age-inputs {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.age-inputs input {
		width: 100%;
		padding: 0.5rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
	}

	.age-inputs input.errorAge {
		border-color: var(--color-red-500);
	}

	.error-message {
		color: var(--color-red-500);
		font-size: 0.875rem;
	}
</style>
