import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;

export const CORE_ENDPOINTS = {
	apiHelloWorld: {
		url: `${API_BASE_URL}/hello-world`,
		methods: {
			GET: 'GET'
		}
	},
	apiHelloWorldPost: {
		url: `${API_BASE_URL}/hello-world-post`,
		methods: {
			GET: 'GET'
		}
	}
};
