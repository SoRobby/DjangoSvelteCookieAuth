interface Cookie {
	name: string;
	value: string;
}
export function getCookie(name: string, cookieString?: string): string | null {
	if (typeof document === 'undefined') {
		// Server-side logic: extract cookie from the cookie string
		if (!cookieString) return null;
		const cookies = cookieString
			.split('; ')
			.reduce((acc: { [key: string]: string }, currentCookie) => {
				const [cookieName, cookieValue] = currentCookie.split('=');
				acc[cookieName] = cookieValue;
				return acc;
			}, {});
		return cookies[name] || null;
	} else {
		// Client-side logic
		const value: string = `; ${document.cookie}`;
		const parts: string[] = value.split(`; ${name}=`);
		if (parts.length === 2) {
			const cookieValue: string | undefined = parts.pop()?.split(';').shift();
			return cookieValue ?? null;
		}
		return null;
	}
}
