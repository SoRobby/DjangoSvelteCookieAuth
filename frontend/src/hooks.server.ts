import { sequence } from '@sveltejs/kit/hooks';
import { setupCookie } from '$lib/utils/cookieConfig';
import { getCurrentUser } from '$lib/utils/auth/authHandler';
import type { Handle } from '@sveltejs/kit';
import { AUTH_ENDPOINTS } from '$lib/server/endpoints/auth';

console.log('\n[HOOKS.SERVER.TS] Called');

export async function handle({ event, resolve }) {
	// Get cookies from the request
	// const cookies = event.cookies;

	// // If CSRF token does not exist create a new one:
	// if (!cookies.get('csrftoken')) {
	// 	and

	// 	const csrfResponse = await fetch(AUTH_ENDPOINTS.getCSRFToken.url, {
	// 		method: AUTH_ENDPOINTS.getCSRFToken.methods.POST,
	// 		credentials: 'include'
	// 	});

	// 	console.log(csrfResponse)
	// 	const csrfCookieConfig = setupCookie(csrfResponse, 'csrftoken');
	// 	event.cookies.set('csrftoken', csrfCookieConfig.value, csrfCookieConfig.attributes);
	// 	console.log('[HOOKS.SERVER.TS] CSRF token successfully created and set')
	// }
	

	event.locals.user = {};

	return await resolve(event);
}

