/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {

    const accessToken = cookies.get('accessToken') || '';
    console.log("accessToken: "+accessToken);

    const csrfToken = cookies.get('csrftoken') || '';
	return {
        csrfToken: csrfToken,
        accessToken: accessToken
    };
}