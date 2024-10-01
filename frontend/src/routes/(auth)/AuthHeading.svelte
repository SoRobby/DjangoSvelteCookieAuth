<script lang="ts">
	const { title = null } = $props();
</script>

<div class="flex flex-col items-center justify-center sm:mx-auto sm:w-full sm:max-w-md">
	<a href="/" class="text-lg font-medium hover:text-blue-600">
		WEBSITE NAME
	</a>
	{#if title}
		<h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			{title}
		</h2>
	{/if}
</div>
