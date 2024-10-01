export function getCsrfToken(): string | null {
	// Note this function only works if the cookie is set
	// in the same domain as the frontend
	const name = 'csrftoken';
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
	return null;
}
