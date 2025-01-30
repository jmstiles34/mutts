export async function POST({ request }) {
	const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/match', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: request.headers.get('cookie') || ''
		},
		body: JSON.stringify(await request.json()),
		credentials: 'include'
	});

	return new Response(await response.text(), {
		status: response.status,
		headers: response.headers
	});
}
