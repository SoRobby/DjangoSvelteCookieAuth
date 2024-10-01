// Function is used on the server side to take in an API response and then parse out a target
// cookie from the response headers. This cookieConfig can then be used to set the cookie
// on the client side.

// EXAMPLE:
// const csrfResponse = await fetch('http://localhost:8000/api/v1/set-csrf-decorator', {
//     method: 'POST',
//     credentials: 'include'
// });
//
// const csrfConfig = setupCookie(csrfResponse, 'csrftoken');
// event.cookies.set('csrftoken', csrfConfig.value, csrfConfig.attributes);

export function setupCookie(response: Response, cookieName: string) {
	const setCookieHeader = response.headers.get('set-cookie');

	if (!setCookieHeader) {
		throw new Error(`No Set-Cookie header found in the response.`);
	}

	const cookieMatch = setCookieHeader.match(new RegExp(`${cookieName}=([^;]+);`));
	if (!cookieMatch) {
		throw new Error(`Cookie ${cookieName} not found in the Set-Cookie header.`);
	}

	const value = cookieMatch[1];
	const expiresMatch = setCookieHeader.match(/expires=([^;]+);/);
	const maxAgeMatch = setCookieHeader.match(/Max-Age=([^;]+);/);
	const pathMatch = setCookieHeader.match(/Path=([^;]+);/);
	const httpOnlyMatch = setCookieHeader.match(/HttpOnly/);
	const sameSiteMatch = setCookieHeader.match(/SameSite=([^;]+);/);
	const secureMatch = setCookieHeader.match(/Secure/i);

	console.log("secureMatch:", !!secureMatch);


	return {
		value,
		attributes: {
			path: pathMatch ? pathMatch[1] : '/',
			httpOnly: !!httpOnlyMatch,
			secure: !!secureMatch,
			sameSite: sameSiteMatch
				? (sameSiteMatch[1].toLowerCase() as 'Lax' | 'Strict' | 'None')
				: 'Lax',
			maxAge: maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : undefined,
			expires: expiresMatch ? new Date(expiresMatch[1]) : undefined,
			
		}
	};
}
