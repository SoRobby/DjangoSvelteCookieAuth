import { USER_SETTINGS_ENDPOINTS } from '$lib/server/endpoints/userSettings.js';


/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals, cookies }) {
	// Get countries
	const response = await fetch(`http://localhost:8000/api/v1/countries`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	// Check for any errors
	if (!response.ok) {
		throw new Error('Failed to fetch countries');
	}

	// Handle the response
	const data = await response.json();
	console.log(data);
	return data;
}


/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		// Get form data
		const formData = await request.formData();
		let first_name = formData.get('first-name') as string;
		let last_name = formData.get('last-name') as string;
		let bio = formData.get('bio') as string;
		let country_slug = formData.get('country') as string;

		console.log('[+PAGE.SERVER.TS] Form data:', formData);

		// Perform request
		const response = await fetch(USER_SETTINGS_ENDPOINTS.editAccountGeneral.url, {
			method: USER_SETTINGS_ENDPOINTS.editAccountGeneral.methods.POST,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({ 
				first_name: first_name,
				last_name: last_name,
				bio: bio,
				country_slug: country_slug
			})
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



// export const actions = {
// 	default: async ({ request, fetch, cookies }) => {
// 		console.log('[SETTINGS] Updating general settings');

// 		// Get the form data directly from the request
// 		const formData = await request.formData();

// 		// Rename the field to match the expected field in the Django endpoint
// 		formData.append('file', formData.get('profile-image'));

// 		// Prepare the fetch request without manually setting 'Content-Type'
// 		const url = 'http://localhost:8000/api/v1/upload';
// 		const response = await fetch(url, {
// 			method: 'POST',
// 			credentials: 'include',
// 			headers: {
// 				'X-CSRFToken': cookies.get('csrftoken')
// 			},
// 			body: formData // Send the form data directly
// 		});

// 		// Check for any errors
// 		if (!response.ok) {
// 			console.error('[UPLOAD ERROR]', response.statusText);
// 			throw new Error(`Failed to upload file: ${response.statusText}`);
// 		}

// 		// Handle the response if needed
// 		const result = await response.json();
// 		console.log('[UPLOAD SUCCESS]', result);
// 	}
// };
