export function getCsrfToken(): string | null {
	// Note this function only works if the cookie is set
	// in the same domain as the frontend
	const name = 'csrftoken';
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
	return null;
}

export function logout() {
	// Remove cookies of sessionid
}

export async function getCurrentUser() {
	console.log('[authHandler] getCurrentUser');

	const response = await fetch('http://localhost:8000/api/v1/auth/get-current-user', {
		method: 'GET',
		credentials: 'include' // This ensures that cookies are sent with the request.
	});

	return response;
}

// export async function getUser() {
//     console.log('[authHandler] getUser')

//     let endpoint = "http://localhost:8000/api/accounts/auth/get-current-user"
//     const response = await fetch(endpoint, {
//         method: "GET",
//         credentials: "include",
//     });

//     const userData = await response.json();
//     return userData
// }
