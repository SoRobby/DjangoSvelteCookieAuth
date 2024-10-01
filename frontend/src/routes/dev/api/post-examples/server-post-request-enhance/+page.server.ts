import { CORE_ENDPOINTS } from '$lib/server/endpoints/endpointCore';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		// Get form data
		const formData = await request.formData();
		let content = formData.get('content');

		// Change content based on form data. This is to test different scenarios
		if (formData.get('request-type') === '200-success-single-country') {
			console.log('[+PAGE.SERVER.TS] 200 OK: Single Country triggered');
			content = '200-success-single-country';
		} else if (formData.get('request-type') === '200-success-list-countries') {
			console.log('[+PAGE.SERVER.TS] 200 OK: List of Countries triggered');
			content = '200-success-list-countries';
		} else if (formData.get('request-type') === '204-success') {
			console.log('[+PAGE.SERVER.TS] 204 No Content triggered');
			content = '204success';
		} else if (formData.get('request-type') === '400-bad-request') {
			console.log('[+PAGE.SERVER.TS] 400 Bad Request triggered');
			content = 10;
		} else if (formData.get('request-type') === '403-forbidden') {
			console.log('[+PAGE.SERVER.TS] 403 Forbidden triggered');
			content = '403error';
		} else if (formData.get('request-type') === '500-internal-server-error') {
			console.log('[+PAGE.SERVER.TS] 500 Internal Server Error triggered');
			content = '500error';
		} 

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


