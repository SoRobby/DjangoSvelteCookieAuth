import { AUTH_ENDPOINTS } from '$lib/api/server/endpoints/auth';

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies, locals }) => {
		console.log('[LOGIN] Form submitting');

		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		console.log('\tEmail:', email);
		console.log('\tPassword:', password);

		// Get cookies
		console.log('\tCookies:', cookies.get('csrftoken'));

		// Attempt to login
		const response = await fetch(AUTH_ENDPOINTS.login, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': cookies.get('csrftoken')
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		if (response.ok) {
			const responseData = await response.json();
			console.log('\tLogin successful');
			console.log('\t\tResponse data:', responseData);

			// Set sessionid cookie
			if (responseData.sessionid) {
				console.log('\t\tSetting session ID in cookies');
				cookies.set('sessionid', responseData.sessionid, {
					path: '/', // Ensure the cookie is accessible throughout the site
					httpOnly: true, // Make it HTTP-only for security
					sameSite: 'Lax', // Protect against CSRF
					secure: true, // Use true in production when using HTTPS
					maxAge: 60 * 60 * 24 * 7 // 1 week expiration
				});
			}

			if (responseData.username) {
				console.log('\t\tSetting username in cookies');
				cookies.set('username', responseData.username, {
					path: '/', // Ensure the cookie is accessible throughout the site
					httpOnly: true, // Make it HTTP-only for security
					sameSite: 'Lax', // Protect against CSRF
					secure: true, // Use true in production when using HTTPS
					maxAge: 60 * 60 * 24 * 7 // 1 week expiration
				});
			}

			return {
				success: true,
				serverResponse: responseData
			};
		} else {
			console.error('\tLogin failed');
			const errorData = await response.json();
			console.log('\t\tError data:', errorData);
			return {
				success: false,
				message: errorData.message
			};
		}
	}
};
