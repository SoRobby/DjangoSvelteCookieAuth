<script lang="ts">
	let { title, description, link, showPremiumLabel = false } = $props();
	import { ArrowRight } from 'lucide-svelte';
	import { Badge } from '$lib/components/ui/badge';
</script>

<div class="overflow-hidden rounded-md border border-slate-200">
	<div class="flex gap-2 bg-slate-100 px-4 py-3">
		<a href={link}><h2 class="flex-1 font-medium">{title}</h2></a>
		{#if showPremiumLabel === true}
			<div>
				<Badge class="bg-blue-600">Premium</Badge>
			</div>
		{/if}
	</div>
	<div class="space-y-2 px-4 pb-4 pt-3">
		<p class="text-sm text-gray-700">
			{description}
		</p>
		<div>
			<a
				href={link}
				class="flex w-min items-center gap-2 text-nowrap text-sm font-medium text-blue-600 hover:underline"
			>
				Run model
				<ArrowRight size="18" />
			</a>
		</div>
	</div>
</div>
