import axios from 'axios';
import cookie from "cookie";
import localStoreSchema from '$lib/stores/schema';
import { browser } from '$app/environment';
import { purgeLocalStorage } from "$lib/utils/misc";
import type { AxiosInstance, AxiosError } from 'axios';
import { PUBLIC_ROOT_URL } from '$env/static/public';

class AuthApi {
    private refreshInterval: ReturnType<typeof setInterval> | undefined;
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: `${PUBLIC_ROOT_URL}/api`
        });;
        this.refreshInterval = undefined;
    }

    async login(
        email: string, 
        password: string, 
        rememberMe: boolean = true, 
        ) {

        const endpoint = `/token/pair`;
        try {
            const res = await this.client({
                url: endpoint,
                method: 'POST',
                data: {
                    email,
                    password
                },
            })
            if (res.data.email) {
                // Setting access token cookie for Sveltekit Server-side API authorization (internal)
                document.cookie = cookie.serialize(localStoreSchema.acessToken, res.data.access ?? "", {
                    path: "/",
                    maxAge: res.data.access ? undefined : 0,
                    // httpOnly: true,
                    sameSite: "strict"
                });
                // Saving access/refresh tokens inside local storage for session refresh cycle
                localStorage.setItem(localStoreSchema.acessToken, res.data.access)
                if (rememberMe) {
                    localStorage.setItem(localStoreSchema.refreshToken, res.data.refresh);
                    this.initRefreshTokenCycle();
                }
                return true;
            }
        } catch (err) {
            console.error(err);
            //TODO
        }
    }

    initRefreshTokenCycle() {
        if (window) {
            const refresh_token = localStorage.getItem(localStoreSchema.refreshToken);
            if (refresh_token && refresh_token?.length > 0) {
                // console.log("Setting up refresh interval")
                this.refreshInterval = setInterval(() => this.refreshToken(refresh_token),
                    1000 * 60 * 3 // refresh every 3 min
                )
            }
        }
    }

    clearRefreshInterval() {
        clearInterval(this.refreshInterval);
    }

    async refreshToken(refresh_token: string) {

        const endpoint = '/token/refresh';
        const data = {
            'refresh': refresh_token,
        }
        if (refresh_token !== null) {
            try {
                const res = await this.client(
                    {
                        url: endpoint,
                        method: 'POST',
                        data: data
                    }
                )
                if (res.status === 200) {
                    localStorage.setItem(localStoreSchema.acessToken, res.data.access)
                    document.cookie = cookie.serialize(localStoreSchema.acessToken, res.data.access ?? "", {
                        path: "/",
                        maxAge: res.data.access ? undefined : 0,
                        sameSite: "strict"
                    });
                    return true;
                }
            } catch (e) {
                const err = e as AxiosError;
                const res_status = err?.response?.status
                if (res_status === 401 || res_status === 400) {
                    this.logout();
                    return false;
                }
            }
        };
    }

    logout() {
        document.cookie = cookie.serialize(localStoreSchema.acessToken, "", {
            path: "/",
            maxAge: -1,
            sameSite: "strict"
        });
        if (browser) {
            purgeLocalStorage();
            window.location.href = '/login';
        }
    }

}

export default new AuthApi();