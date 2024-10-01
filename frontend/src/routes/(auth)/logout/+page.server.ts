import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default({ cookies, locals }) {
        console.log('LOGGING USER OUT');
        // Delete the cookies that are associated with the user session
        cookies.delete('sessionid', {
            path: '/',
        });

        cookies.delete('username', {
            path: '/',
        });

        // Set the user locals to an empty object
        locals.user = {};

		throw redirect(302, '/');
	},
};
