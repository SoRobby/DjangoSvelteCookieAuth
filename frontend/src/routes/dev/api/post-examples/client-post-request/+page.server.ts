/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
    const csrfToken = cookies.get('csrftoken') || '';
	return {csrfToken: csrfToken};
}