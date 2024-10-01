import { CORE_ENDPOINTS } from '$lib/server/endpoints/endpointCore';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		// Get form data
		const formData = await request.formData();
		let content = formData.get('content');

		console.log('[+PAGE.SERVER.TS] Form data:', formData);

		// Perform request
		const response = await fetch(CORE_ENDPOINTS.apiHelloWorldPost, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
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


