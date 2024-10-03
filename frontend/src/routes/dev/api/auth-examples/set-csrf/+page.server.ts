import { AUTH_ENDPOINTS } from '$lib/api/server/endpoints/auth';
import { setupCookie } from '$lib/utils/cookieConfig';

/** @type {import('./$types').Actions} */
export const actions = {
	setCsrfToken: async ({ cookies }) => {
		console.log('[HOOKS.SERVER.TS] No CSRF token found in cookies. Creating a new one...');

		const csrfResponse = await fetch(AUTH_ENDPOINTS.getCSRFToken.url, {
			method: AUTH_ENDPOINTS.getCSRFToken.methods.POST,
			headers: {
				'X-CSRFToken': cookies.get('csrftoken') || ''
			}
		});

		console.log('csrfResponse:', csrfResponse);

		const csrfCookieConfig = setupCookie(csrfResponse, 'csrftoken');
		cookies.set('csrftoken', csrfCookieConfig.value, csrfCookieConfig.attributes);
	}
};
