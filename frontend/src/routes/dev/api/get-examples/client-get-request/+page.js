import { HELLO_WORLD_ENDPOINTS } from "$lib/client/endpoints/helloWorld";


/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	console.log('API Test');
	const response = await fetch(HELLO_WORLD_ENDPOINTS.helloWorldGet.url, {
		method: HELLO_WORLD_ENDPOINTS.helloWorldGet.methods.GET
	});

	// Check for any errors
	if (!response.ok) {
		console.log('[+PAGE.JS] Error response');
		const data = await response.json();
		console.log('[+PAGE.JS] Error:', data);
		return data;
	}

	// Handle the response
	const data = await response.json();
	console.log('[+PAGE.JS] Success data:', data);
	return data;
}
