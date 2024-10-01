<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	const { children, class: className = '' }: { children: Snippet; class?: string | null } =
		$props();
</script>

<div class={cn('flex flex-col gap-2', className)}>
	{@render children()}
</div>
