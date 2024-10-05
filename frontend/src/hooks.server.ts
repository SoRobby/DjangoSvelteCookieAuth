import { sequence } from '@sveltejs/kit/hooks';
import { setupCookie } from '$lib/utils/cookieConfig';
import { getCurrentUser } from '$lib/utils/auth/authHandler';
import type { Handle } from '@sveltejs/kit';
import { AUTH_ENDPOINTS } from '$lib/server/endpoints/auth';

console.log('\n[HOOKS.SERVER.TS] Called');

export async function handle({ event, resolve }) {
	// Get cookies from the request
	// const cookies = event.cookies;

	// Get cookies
	console.log('Cookies start')
	console.log(event.cookies.get('accessToken'));
	console.log('Cookies end')

	if (event.cookies.get('accessToken')) {
		
	}
	



	event.locals.user = {};

	return await resolve(event);
}

