import { redirect } from '@sveltejs/kit';

export const load = async ({ fetch }) => {
  let breeds = []

		const response = await fetch('/api/dogs/breeds', {
			method: 'GET',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			}
		});

    if (response.status !== 200) {
      throw redirect(302, '/');
    } else {
      breeds = await response.json();
    }
		
	return {
		breeds
	};
};
