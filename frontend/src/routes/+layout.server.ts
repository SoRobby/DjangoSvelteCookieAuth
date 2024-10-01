import type { LayoutServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private'

export async function load({ locals }) {
	console.log('SECRET_API_KEY =', SECRET_API_KEY)

	// Pass the user data to the +page.svelte
	// console.log('[+LAYOUT.SERVER.TS] LOAD')
	// console.log('\tlocals:', locals);
	return {
		user: locals.user
	};
}
