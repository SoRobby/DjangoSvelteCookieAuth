// $lib/utils/clientFetchWrapper.ts

import { getCsrfToken } from './getCsrfToken';

interface FetchOptions extends RequestInit {
	skipCsrf?: boolean;
}

export async function clientFetchWrapper(
	url: string,
	options: FetchOptions = {}
): Promise<Response> {
	const { method = 'GET', headers = {}, skipCsrf = false, ...restOptions } = options;

	const newHeaders = new Headers(headers);

	if (
		!skipCsrf &&
		(method === 'POST' || method === 'PUT' || method === 'DELETE' || method === 'PATCH')
	) {
		const csrfToken = getCsrfToken();
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

	return fetch(url, fetchOptions);
}
