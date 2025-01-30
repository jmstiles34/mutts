export async function POST({ request }) {
	const response = await fetch('https://frontend-take-home-service.fetch.com/auth/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(await request.json()),
		credentials: 'include'
	});

	return new Response(await response.text(), {
		status: response.status,
		headers: response.headers
	});
}
