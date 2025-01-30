export async function GET({ request, url }) {
	const response = await fetch(
		`https://frontend-take-home-service.fetch.com/dogs/search${url.search}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Cookie: request.headers.get('cookie') || ''
			},
			credentials: 'include'
		}
	);

	return new Response(await response.text(), {
		status: response.status,
		headers: response.headers
	});
}
