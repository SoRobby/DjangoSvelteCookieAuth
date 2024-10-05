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
		const endpoint = '/token/pair';
		try {
			const res = await this.client({
				url: endpoint,
				method: 'POST',
				data: {
					email,
					password
				}
			});

			if (res.data.email) {
				console.log('[AuthApi] login() response:');

				console.log(res);

				// Setting the cookie
				document.cookie = cookie.serialize("accessToken", res.data.access, {
					path: '/',
					maxAge: 60 * 60 * 24 * 7,
					sameSite: 'lax'
				});


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

	async refreshToken(refresh_token: string) {
		const endpoint = '/token/refresh';
		const data = { refresh: refresh_token };
	}

	// Refresh token
	initRefreshTokenCycle() {}

	clearRefreshInterval() {
		clearInterval(this.refreshInterval);
	}

	logout() {
		console.log('[AuthApi] logout()');
	}
}

export default new AuthApi();
