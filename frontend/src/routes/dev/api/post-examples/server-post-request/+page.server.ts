import { PUBLIC_API_ROOT_URL } from '$env/static/public';
import { CORE_ENDPOINTS } from '$lib/server/endpoints/endpointCore';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		const accessToken = cookies.get('accessToken') || '';

		// Get form data
		const formData = await request.formData();
		let content = formData.get('content');

		console.log('[+PAGE.SERVER.TS] Form data:', formData);

		const endpoint = `${PUBLIC_API_ROOT_URL}/api/v1/hello-world-post-simple`;

		// Perform request
		const response = await fetch(endpoint, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				"Authorization": `Bearer ${accessToken}`,
			},
			body: JSON.stringify({ content: content })
		});

		// Check for any errors
		if (!response.ok) {
			console.log('[+PAGE.SERVER.TS] Error response');
			const data = await response.json();
			console.log('[+PAGE.SERVER.TS] Error data:', data);
			return data;
		}

		// Handle the response
		const data = await response.json();
		console.log('[+PAGE.SERVER.TS] Success data:', data);
		return data;
	}
};


