import type { Cookies, RequestEvent } from '@sveltejs/kit';

interface FetchOptions extends RequestInit {
	skipCsrf?: boolean;
}

export async function serverFetchWrapper(
	url: string,
	event: RequestEvent,
	options: FetchOptions = {}
): Promise<Response> {
	const { method = 'GET', headers = {}, skipCsrf = false, ...restOptions } = options;

	const newHeaders = new Headers(headers);

	if (
		!skipCsrf &&
		(method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH')
	) {
		const csrfToken = event.cookies.get('csrftoken');
		if (csrfToken) {
			newHeaders.set('X-CSRFToken', csrfToken);
		}
	}

	if (!newHeaders.has('Content-Type') && !(options.body instanceof FormData)) {
		newHeaders.set('Content-Type', 'application/json');
	}

	const fetchOptions: RequestInit = {
		...restOptions,
		method,
		headers: newHeaders,
		credentials: 'include'
	};

	return event.fetch(url, fetchOptions);
}