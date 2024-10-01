<script lang="ts">
	import type { Snippet } from 'svelte';
	let { children }: { children: Snippet } = $props();
</script>

<div class="grid grid-cols-2 gap-6 py-6">
	{@render children()}
</div>
