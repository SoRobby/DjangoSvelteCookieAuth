import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from '../$types';

export const load = (async ({ locals, url }) => {
    if (!locals.user) {
        throw redirect(307, `/login?next=${url.pathname}`)
    }
}) satisfies LayoutServerLoad;