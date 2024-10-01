import { SUPPORT_ENDPOINTS } from '$lib/server/endpoints/support';
import { page } from '$app/stores';  


export const actions = {
	submitSupportMessage: async ({ request, fetch, cookies, url }) => {
		console.log('[SETTINGS.SUPPORT] Submitting a support message');

		// Get the form data directly from the request
		const formData = await request.formData();
		const { name, username, email, subject, content } = Object.fromEntries(formData.entries());

		// Get the CSRF token from the cookies
		const csrfToken = cookies.get('csrftoken') || '';

		const fullUrl = url.href;
		console.log(`Full URL: ${fullUrl}`);
	
		// Get just the path
		const path = url.pathname;
		console.log(`Path: ${path}`);

		// Prepare the fetch request without manually setting 'Content-Type'
		const response = await fetch(SUPPORT_ENDPOINTS.supportMessages.url, {
			method: SUPPORT_ENDPOINTS.supportMessages.methods.POST,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({
				name: name,
				username: username,
				email: email,
				subject: subject,
				content: content,
			})
		});

		// Check for any errors
		if (!response.ok) {
			console.error('[SETTINGS.SUPPORT] Fetch POST request failed', response.statusText);
			throw new Error(`Failed to upload file: ${response.statusText}`);
		}

		// Handle the response if needed
		const result = await response.json();
		console.log('[SETTINGS.SUPPORT] Fetch POST request success', result);
	}


	// default: async ({ request, fetch, cookies }) => {
	// 	console.log('[SETTINGS] Updating notificaiton settings');

	// 	// Get the form data directly from the request
	// 	const formData = await request.formData();

    //     console.log('formData:', formData);

	// 	// Prepare the fetch request without manually setting 'Content-Type'
	// 	const response = await fetch(USER_SETTINGS_ENDPOINTS.sendSupportMessage.url, {
	// 		method: USER_SETTINGS_ENDPOINTS.sendSupportMessage.methods.POST,
	// 		credentials: 'include',
	// 		headers: {
	// 			'X-CSRFToken': cookies.get('csrftoken') || ''
	// 		},
	// 		body: JSON.stringify({
	// 			name: formData.get('name'),
	// 			username: 'adfasfasdf',
	// 			email: formData.get('email'),
	// 			subject: formData.get('subject'),
	// 			message: formData.get('message')
	// 		})
	// 	});

	// 	// Check for any errors
	// 	if (!response.ok) {
	// 		console.error('[FETCH REQUEST FAILED]', response.statusText);
	// 		throw new Error(`Failed to upload file: ${response.statusText}`);
	// 	}

	// 	// Handle the response if needed
	// 	const result = await response.json();
	// 	console.log('[UPLOAD SUCCESS]', result);
	// }
};
