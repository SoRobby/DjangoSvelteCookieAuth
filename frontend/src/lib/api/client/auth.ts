import axios from 'axios';
import cookie from 'cookie';
import { browser } from '$app/environment';
import type { AxiosInstance, AxiosError } from 'axios';
import { PUBLIC_ROOT_URL } from '$env/static/public';
import { tokenStoreSchema } from '$lib/stores/tokenStore';
import { purgeLocalStorage } from '$lib/utils/purgeLocalStorage';
import { error } from '@sveltejs/kit';

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

			// If response contains email
			if (res.data.email) {
				console.log('[AuthApi] login() response:');
				console.log(res);

				// Setting the cookie
				document.cookie = cookie.serialize(tokenStoreSchema.accessToken, res.data.access, {
					path: '/',
					// maxAge: 60 * 60 * 24 * 7,
					maxAge: res.data.access ? undefined : 0,
					sameSite: 'lax'
				});

				// Saving access and refresh tokens to local storage
				localStorage.setItem(tokenStoreSchema.accessToken, res.data.access);
				localStorage.setItem(tokenStoreSchema.refreshToken, res.data.refresh);
				this.initRefreshTokenCycle();

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
		console.log('[AuthApi] refreshToken()');
		const endpoint = '/token/refresh';
		const data = { refresh: refresh_token };

		if (refresh_token !== null) {
			try {
				const res = await this.client({
					url: endpoint,
					method: 'POST',
					data: data
				});
				if (res.status === 200) {
					document.cookie = cookie.serialize(tokenStoreSchema.accessToken, res.data.access, {
						path: '/',
						maxAge: res.data.access ? undefined : 0,
						sameSite: 'lax'
					});
					localStorage.setItem(tokenStoreSchema.accessToken, res.data.access);
				}
			} catch (error) {
				console.log('[AuthApi] refreshToken() error:');
				console.error(error);
				const resError = error as AxiosError;
				const resStatus = resError?.response?.status;
				if (resStatus === 400 || resStatus === 400) {
					this.logout();
					return false;
				}
			}
		}
	}

	// Refresh token
	initRefreshTokenCycle() {
		console.log('[AuthApi] initRefreshTokenCycle()');
		if (window) {
			const cookies = cookie.parse(document.cookie);
			const refreshToken = localStorage.getItem(tokenStoreSchema.refreshToken);

			if (refreshToken && refreshToken.length > 0) {
				console.log('Getting new access token');
				this.refreshInterval = setInterval(() => this.refreshToken(refreshToken), 1000 * 60);
			}
		}
	}

	clearRefreshInterval() {
		clearInterval(this.refreshInterval);
	}

	logout() {
		console.log('[AuthApi] logout()');

		// Remove cookies
		document.cookie = cookie.serialize(tokenStoreSchema.accessToken, '', {
			path: '/',
			maxAge: -1,
			sameSite: 'lax'
		});

		// Purge local storage of JWT tokens and redirect to home page
		if (browser) {
			purgeLocalStorage();
			window.location.href = '/';
		}
	}
}

export default new AuthApi();
