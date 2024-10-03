import type { Handle } from "@sveltejs/kit";
import localStoreSchema from '$lib/stores/schema';
import { getUser } from '$lib/api/server/user'

export const handle: Handle = async ({ event, resolve }) => {

    const token = event.cookies.get(localStoreSchema.acessToken);

    if (token) {
        try {
            const res = await getUser(token);
            console.log("Hooks res ", res)
            if (res?.success)  {
                event.locals.user = res.account;
            }
        } catch (err) {
            console.error(err)
            event.cookies.set(localStoreSchema.acessToken, "", { maxAge: -1 });
        }
    }
    return await resolve(event);
}




