import { fail, error, redirect } from '@sveltejs/kit';
import { AUTH_ENDPOINTS } from '$lib/server/endpoints/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

	// If user is already logged in, redirect to home page
	if (locals.user?.sessionid) {
		redirect(302, '/');
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies, locals }) => {
		// Get the form data directly from the request
		const formData = await request.formData();
		const { email, password } = Object.fromEntries(formData.entries());

		// Get CSRF token and ensure it's a string
		// const csrfToken = cookies.get('csrftoken') || '';

		let endpoint = 'http://localhost:8000/api/token/pair'

		// Attempt to login
		const response = await fetch(endpoint, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				// 'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		});

		console.log(response)

		// Check for errors
		if (!response.ok) {
			const data = await response.json();
			return data;
		}

		// If successful response, and after cookies are set
		// HOOKS.SERVER.TS will set the user data in locals
		const data = await response.json();
		console.log(data);
		console.log(data.username)

		// Set locals of user
		locals.user = {
			username: data.username,
			email: data.email,
			is_superuser: data.is_superuser,
			sessionid: data.sessionid
		};

		// Set session ID in cookies
		if (data.sessionid) {
			cookies.set('sessionid', data.sessionid, {
				path: '/', // Ensure the cookie is accessible throughout the site
				httpOnly: true, // Make it HTTP-only for security
				sameSite: 'Lax', // Protect against CSRF
				secure: true, // Use true in production when using HTTPS
				maxAge: 60 * 60 * 24 * 7 // 1 week expiration
			});
		}

		// Set username in cookies
		if (data.username) {
			cookies.set('username', data.username, {
				path: '/', // Ensure the cookie is accessible throughout the site
				httpOnly: true, // Make it HTTP-only for security
				sameSite: 'Lax', // Protect against CSRF
				secure: true, // Use true in production when using HTTPS
				maxAge: 60 * 60 * 24 * 7 // 1 week expiration
			});
		}

		// Redirect to the home page
		// TODO - Redirect to the previous page if available
		redirect(302, '/');
	}
};
