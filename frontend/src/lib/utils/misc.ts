import { localStoreSchema } from "$lib/stores/schema";

export function purgeLocalStorage() {
    for (const key of Object.values(localStoreSchema)) {
        console.log("key", key)
        localStorage.removeItem(key);
    }
}