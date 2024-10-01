/** @type {import('./$types').PageServerLoad} */
export async function load({ params, cookies }) {
    const allCookies = cookies
		.getAll()
		.map((cookie) => `${cookie.name}=${cookie.value}`)
		.join('; ');

	const response = await fetch('http://localhost:8000/api/v1/auth/get-current-user', {
	    method: 'GET',
	    credentials: 'include',
	    headers: {
	        'Content-Type': 'application/json',
	        Cookie: allCookies
	    }
	});

	if (!response.ok) {
		const data = await response.json();
		return data;
	}

	// Handle the response
	const data = await response.json();
	return data;
}
