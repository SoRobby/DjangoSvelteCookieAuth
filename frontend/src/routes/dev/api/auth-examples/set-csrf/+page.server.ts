import { AUTH_ENDPOINTS } from '$lib/server/endpoints/auth';
import { setupCookie } from '$lib/utils/cookieConfig';

/** @type {import('./$types').Actions} */
export const actions = {
	setCsrfToken: async ({ cookies }) => {
		console.log('[HOOKS.SERVER.TS] No CSRF token found in cookies. Creating a new one...');

		const csrfResponse = await fetch(AUTH_ENDPOINTS.getCSRFToken.url, {
			method: AUTH_ENDPOINTS.getCSRFToken.methods.POST,
		});

		const csrfCookieConfig = setupCookie(csrfResponse, 'csrftoken');

		cookies.set('csrftoken', csrfCookieConfig.value, {
			path: '/',
			httpOnly: false,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});
	}
};
