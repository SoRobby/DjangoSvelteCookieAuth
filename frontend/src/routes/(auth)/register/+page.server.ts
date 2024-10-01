import { redirect } from '@sveltejs/kit';
import { AUTH_ENDPOINTS } from '$lib/server/endpoints/auth';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, locals, cookies }) {
	// If user is already logged in, redirect to home page
	if (locals.user?.sessionid) {
		redirect(302, '/');
	}

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
	return data;
}

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, fetch, cookies }) => {
		console.log('[REGISTER/+PAGE.SERVER.TS] Called');

		// Get the form data directly from the request
		const formData = await request.formData();
		const {
			email,
			username,
			password1,
			password2,
			'first-name': first_name,
			'last-name': last_name,
			country,
			organization
		} = Object.fromEntries(formData.entries());

		// Get CSRF token and ensure it's a string
		const csrfToken = cookies.get('csrftoken') || '';

		// Attempt to register the user
		const response = await fetch(AUTH_ENDPOINTS.register.url, {
			method: AUTH_ENDPOINTS.register.methods.POST,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({
				email: email,
				username: username,
				password1: password1,
				password2: password2,
				first_name: first_name,
				last_name: last_name
			})
		});

		// Check if the response is ok
		if (!response.ok) {
			console.log('[REGISTER/+PAGE.SERVER.TS] Registration failed');
			const data = await response.json();

			// Return previous data to the form and server data
			return {
				success: data.success,
				status: data.status,
				message: data.message,
				errors: data.errors,
				formFields: {
					email: email,
					username: username,
					first_name: first_name,
					last_name: last_name,
					country: country,
					organization: organization
				}
			};
		}

		// If successful response, and after cookies are set
		// HOOKS.SERVER.TS will set the user data in locals
		const data = await response.json();

		// Set session ID in cookies
		if (data.sessionid) {
			console.log('\t\tSetting session ID in cookies');
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
			console.log('\t\tSetting username in cookies');
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
