import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;

export const USER_SETTINGS_ENDPOINTS = {
	sendSupportMessage: {
		url: `${API_BASE_URL}/auth/edit/user/support`,
		methods: {
			POST: 'POST'
		}
	},
	deleteAccount: {
		url: `${API_BASE_URL}/auth/edit/delete-account`,
		methods: {
			POST: 'POST'
		}
	},
	editAccountGeneral: {
		url: `${API_BASE_URL}/auth/edit/user-general`,
		methods: {
			POST: 'POST'
		}
	}
};

