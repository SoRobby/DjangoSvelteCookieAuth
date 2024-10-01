// /** @type {import('./$types').PageServerLoad} */
// export async function load({ params, cookies }) {
// 	const allCookies = cookies
// 		.getAll()
// 		.map((cookie) => `${cookie.name}=${cookie.value}`)
// 		.join('; ');

// 	const response = await fetch('http://localhost:8000/api/v1/auth/edit/user-general', {
// 		method: 'GET',
// 		credentials: 'include',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Cookie: allCookies
// 		}
// 	});

// 	if (response.ok) {
// 		let data = await response.json();
// 		console.log(data);

// 		return data;

// 	} else {
// 		console.log('Failed to fetch user data!!!');
// 		let data = await response.json();
// 		console.log(data)
// 		return {};
// 	}
// }

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		console.log('[SETTINGS] Updating general settings');

		// Get the form data directly from the request
		const formData = await request.formData();

		// Rename the field to match the expected field in the Django endpoint
		formData.append('file', formData.get('profile-image'));

		// Prepare the fetch request without manually setting 'Content-Type'
		const url = 'http://localhost:8000/api/v1/upload';
		const response = await fetch(url, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'X-CSRFToken': cookies.get('csrftoken')
			},
			body: formData // Send the form data directly
		});

		// Check for any errors
		if (!response.ok) {
			console.error('[UPLOAD ERROR]', response.statusText);
			throw new Error(`Failed to upload file: ${response.statusText}`);
		}

		// Handle the response if needed
		const result = await response.json();
		console.log('[UPLOAD SUCCESS]', result);
	}
};
