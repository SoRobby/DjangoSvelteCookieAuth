<script>
	import '../app.css';
	import '../styles/custom.css';
	let { children, data } = $props();

	import { Toaster } from '$lib/components/ui/sonner';
	import { onMount, setContext } from 'svelte';
	import userState from '$lib/utils/auth/userState.svelte';
	import DevBar from '$lib/components/dev/devbar/devbar.svelte';
	import authApi from "$lib/api/client/auth";

	onMount(() => {

		authApi.initRefreshTokenCycle();

		return () => {
			authApi.clearRefreshInterval();
		}
	})

	const user = userState({
		username: null,
		email: null
	});

	setContext('user', user);
</script>

<Toaster />
{@render children()}
<DevBar data={data} />
