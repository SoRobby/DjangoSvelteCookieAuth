<script lang="ts">
	let { children, data } = $props();

	import { Main } from '$lib/components/layout/main';
	import { Header } from '$lib/components/layout/header';
	import { Footer } from '$lib/components/layout/footer';
</script>

<Header userData={data.user} />
<Main variant="default">
	{@render children()}
</Main>
<Footer />
