// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				username?: string;
				email?: string;
				first_name?: string;
				last_name?: string;
				country_slug?: string;
				is_superuser?: boolean;
				sessionid?: string;
			}
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
