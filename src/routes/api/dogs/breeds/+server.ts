export async function GET({request}) {
	const response = await fetch('https://frontend-take-home-service.fetch.com/dogs/breeds', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: request.headers.get('cookie') || ''
		}
	});

	return new Response(await response.text(), {
		status: response.status,
		headers: response.headers
	});
}
