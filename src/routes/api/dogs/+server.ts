import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const response = await fetch('https://frontend-take-home-service.fetch.com/dogs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Cookie: request.headers.get('cookie') || ''
		},
		body: JSON.stringify(await request.json()),
		credentials: 'include'
	});

  const reader = response.body?.getReader();
	const decoder = new TextDecoder();
	let result = '';
	let done = false;

  if (reader) {
    while (!done) {
			const { value, done: readerDone } = await reader.read();
			done = readerDone;
			if (value) {
				result += decoder.decode(value, { stream: true });
			}
		}
	}
	
	return json(JSON.parse(result));
}
