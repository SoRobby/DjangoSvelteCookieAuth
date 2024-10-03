import axios from 'axios';
import { browser } from '$app/environment';
import { localStoreSchema } from "$lib/stores/schema";
import { PUBLIC_ROOT_URL } from '$env/static/public';
const API_BASE_URL = `${PUBLIC_ROOT_URL}/api/v1`;

const DEBUG = process.env.NODE_ENV === "development";

axios.interceptors.request.use((config) => {
    if (!browser) return config;
    /** In dev, intercepts request and logs it into console for dev */
    // if (DEBUG) { console.info("✉️ ", config); }
    config.baseURL = API_BASE_URL
    if (!config?.headers || config.url?.endsWith('/pair')) return config;
    const accessToken = localStorage.getItem(localStoreSchema.acessToken)
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    if (DEBUG) { console.error("✉️ ", error); }
    return Promise.reject(error);
});

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // handling any response error 400-500
    if (error?.code === "ERR_NETWORK") {
        // TODO
    }
    if (error?.response && error?.response.data) {
        if (error.response.data?.error) {
            // TODO
        }
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
});

export default axios;