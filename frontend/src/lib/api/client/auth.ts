import axios from 'axios';
import cookie from 'cookie';
import { browser } from '$app/environment';
import type { AxiosInstance, AxiosError } from 'axios';
import { PUBLIC_ROOT_URL } from '$env/static/public';

// import localStoreSchema from '$lib/stores/schema';
// import { purgeLocalStorage } from '$lib/utils/misc';

class AuthApi {
	private refreshInterval: ReturnType<typeof setInterval> | undefined;
	private client: AxiosInstance;

	// Creates an instance of axios with pre-defined properties (baseURL).
	// Also initializes the refreshInterval property.
	constructor() {
		this.client = axios.create({
			baseURL: `${PUBLIC_ROOT_URL}/api`
		});
		this.refreshInterval = undefined;
	}

	// Login method
	async login(email: string, password: string, rememberMe: boolean) {
		console.log('[AuthApi] login()');
		const loginEndpoint = '/token/pair';
		try {
			const res = await this.client({
				url: loginEndpoint,
				method: 'POST',
				data: {
					email,
					password
				}
			});

			if (res.data.email) {
				console.log('[AuthApi] login() response:');
				return {
					success: true,
					message: null
				};
			}
		} catch (error) {
			console.log('[AuthApi] login() error:');
			console.error(error);
			return {
				success: false,
				message: 'Invalid email and/or password'
			};
		}
	}

	logout() {
		console.log('[AuthApi] logout()');
	}
}

export default new AuthApi();
