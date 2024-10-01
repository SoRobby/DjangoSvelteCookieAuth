<script>
	import '../app.css';
	import '../styles/custom.css';
	let { children, data } = $props();

	import { Toaster } from '$lib/components/ui/sonner';
	import { setContext } from 'svelte';
	import userState from '$lib/utils/auth/userState.svelte';
	import DevBar from '$lib/components/dev/devbar/devbar.svelte';

	const user = userState({
		username: null,
		email: null
	});

	setContext('user', user);
</script>

<Toaster />
{@render children()}
<DevBar userData={data.user} data={data} />
