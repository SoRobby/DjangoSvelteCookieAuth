import { CORE_ENDPOINTS } from "$lib/server/endpoints/endpointCore";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    console.log('HELLO SERVER')

	const response = await fetch(CORE_ENDPOINTS.apiHelloWorld, {
		method: 'GET'
	});

	// Check for any errors
	if (!response.ok) {
		const data = await response.json();
		return data;
	}

	// Handle the response
	const data = await response.json();
	return data;
}