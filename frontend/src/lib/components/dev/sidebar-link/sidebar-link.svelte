<script lang="ts">
	import { page } from '$app/stores';
	const { name, link } = $props();
</script>

<a
	href={link}
	class="flex items-center rounded-md px-2 py-1 hover:bg-muted hover:text-gray-800 hover:underline {$page
		.url.pathname === link
		? 'font-medium text-gray-800'
		: 'text-gray-600'}">{name}</a
>
