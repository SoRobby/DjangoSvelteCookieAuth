<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { type Variant, mainVariants } from './index.js';
	import { cn } from '$lib/utils';

	type Props = {
		children: () => unknown;
		class?: string;
		variant?: Variant;
	};

	const { children, class: className = '', variant = 'default' } = $props<Props>();
</script>

<main class={cn(mainVariants({ variant: variant as Variant }), className)}>
	{@render children()}
</main>
