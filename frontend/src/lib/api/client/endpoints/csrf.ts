import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;

export const AUTH_CLIENT_ENDPOINTS = {
	getCSRFToken: {
		url: `${API_BASE_URL}/auth/csrf-token`,
		methods: {
			POST: 'POST'
		}
	},
	validateCSRFToken: {
		url: `${API_BASE_URL}/auth/csrf-token/validate`,
		methods: {
			POST: 'POST'
		}
	},
	validateCSRFTokenCSRFExempt: {
		url: `${API_BASE_URL}/auth/csrf-token/validate-csrf-exempt`,
		methods: {
			POST: 'POST'
		}
	}
};
