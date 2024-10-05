import tokenStoreSchema from "$lib/stores/tokenStore";

export function purgeLocalStorage() {
    for (const key of Object.values(tokenStoreSchema)) {
        localStorage.removeItem(key);
    }
}