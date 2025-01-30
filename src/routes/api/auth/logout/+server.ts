export async function POST() {
	const response = await fetch('https://frontend-take-home-service.fetch.com/auth/logout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	});

	return new Response(await response.text(), {
		status: response.status,
		headers: response.headers
	});
}
