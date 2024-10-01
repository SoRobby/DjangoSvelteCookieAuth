import { USER_SETTINGS_ENDPOINTS } from '$lib/server/endpoints/userSettings';


export const actions = {
	deleteAccount: async ({ request, fetch, locals, cookies }) => {
		console.log('[SETTINGS.SECURITY.DELETE_ACCOUNT] Submitting account deletion request');

		// Get the form data directly from the request
		const formData = await request.formData();
		const { password, uuid } = Object.fromEntries(formData.entries());

		console.log('formData:', formData);

		const csrfToken = cookies.get('csrftoken') || '';

		// Prepare the fetch request without manually setting 'Content-Type'
		const response = await fetch(USER_SETTINGS_ENDPOINTS.deleteAccount.url, {
			method: USER_SETTINGS_ENDPOINTS.deleteAccount.methods.POST,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			},
			body: JSON.stringify({
				password: password,
				uuid: uuid
			})
		});

		// Check for any errors
		if (!response.ok) {
			console.log('[SETTINGS.SECURITY.DELETE_ACCOUNT] Submitting account deletion request');
			const data = await response.json();
			console.log('[+PAGE.SERVER.TS] Error data:', data);
			return data;
		}

		// Handle the response
		const data = await response.json();
		console.log('[+PAGE.SERVER.TS] Success data:', data);


		// Delete the cookies that are associated with the user session
        // Delete the cookies that are associated with the user session
        cookies.delete('sessionid', {
            path: '/',
        });

        cookies.delete('username', {
            path: '/',
        });

        // Set the user locals to an empty object
        locals.user = {};


		return data;
	}
};
