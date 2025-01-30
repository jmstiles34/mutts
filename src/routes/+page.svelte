<script lang="ts">
	import { goto } from '$app/navigation';

	let name: string = $state('');
	let email: string = $state('');
	let error: string = $state('');

	async function handleLogin(e: SubmitEvent): Promise<void> {
		e.preventDefault();
		try {
			const response = await fetch('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ name, email }),
				credentials: 'include'
			});

			if (response.ok) {
				goto('/search');
			} else {
				error = 'Login failed. Please check your credentials.';
			}
		} catch (err) {
			error = 'An error occurred. Please try again.';
		}
	}
</script>

<div class="login-container">
	<form onsubmit={handleLogin} class="login-form">
		<div class="form-group">
			<label for="name">Name</label>
			<input type="text" id="name" bind:value={name} required placeholder="Enter your name" />
		</div>

		<div class="form-group">
			<label for="email">Email</label>
			<input type="email" id="email" bind:value={email} required placeholder="Enter your email" />
		</div>

		{#if error}
			<p class="error">{error}</p>
		{/if}

		<button type="submit"><i class="fa-solid fa-paw fa-xl"></i> &nbsp;Start Searching</button>
	</form>
</div>

<style>
	.login-container {
    height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.login-form {
		background: var(--color-secondary-bg);
		padding: 2rem;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 100%;
		max-width: 400px;
	}

	.form-group {
		margin-bottom: 1.5rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid var(--color-border);
		border-radius: 4px;
		font-size: 1rem;
	}

	input:focus {
		outline: none;
		border-color: var(--color-brown-700);
	}

	button {
		width: 100%;
		padding: 0.75rem;
		background-color: var(--color-brown-500);
		color: var(--color-white);
    font-weight: 600;
		border-radius: 4px;
		transition: background-color 0.2s;
	}

	button:hover {
		background-color: var(--color-olive);
	}

	.error {
		color: var(--color-red-500);
		text-align: center;
		margin-bottom: 1rem;
	}
</style>
