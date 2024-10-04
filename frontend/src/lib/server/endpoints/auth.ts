import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;

export const AUTH_ENDPOINTS = {
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
	register: {
		url: `${API_BASE_URL}/auth/register`,
		methods: {
			POST: 'POST'
		}
	},
	registerValidateEmail: {
		url: `${API_BASE_URL}/auth/register/validate-email`,
		methods: {
			POST: 'POST'
		}
	},
	login: {
		url: `${API_BASE_URL}/auth/login`,
		methods: {
			POST: 'POST'
		}
	},
	getCurrentUser: {
		url: `${API_BASE_URL}/auth/get-current-user`,
		methods: {
			GET: 'GET'
		}
	},
	resetPassword: {
		url: `${API_BASE_URL}/auth/password-reset`,
		methods: {
			POST: 'POST'
		}
	},
	resetPasswordConfirm: {
		url: `${API_BASE_URL}/auth/password-reset/confirm`,
		methods: {
			POST: 'POST'
		}
	},
	JWTTokenPair: {
		url: `${API_BASE_URL}/token/pair`,
		methods: {
			POST: 'POST'
		}
	},
};
