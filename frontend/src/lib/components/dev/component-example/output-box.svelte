<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="bg-blue-100">
	OutputBox
	{@render children()}
</div>
