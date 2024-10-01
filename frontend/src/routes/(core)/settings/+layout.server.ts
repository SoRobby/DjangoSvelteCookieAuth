import { redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies, locals }) {
	// Check to see if the user is logged in
	const sessionId = cookies.get('sessionid') || '';
	if (!sessionId) {
		redirect(307, '/login');
	}

	const allCookies = cookies
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	const response = await fetch('http://localhost:8000/api/v1/auth/edit/user-general', {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Cookie: allCookies
		}
	});

	// Check for any errors
	if (!response.ok) {
		console.log('[+LAYOUT.SERVER.TS] Error response');
		const data = await response.json();
		return data;
	}

	// Handle the response
	const data = await response.json();
	return data;
}
