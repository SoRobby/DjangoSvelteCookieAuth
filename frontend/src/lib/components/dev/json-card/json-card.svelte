<script lang="ts">
	import { toast } from 'svelte-sonner';

	let { data } = $props();

	let isExpanded = $state(true);

	export function copyJsonData(): void {
		const jsonElement = document.getElementById('dev-json');
		
		if (navigator.clipboard && jsonElement) {
			// Copy the JSON content inside the <pre> tag
			navigator.clipboard
				.writeText(jsonElement.textContent || '')
				.then(() => {
					toast.success('JSON copied to clipboard');
				})
				.catch((error) => {
					console.error('Failed to copy JSON: ', error);
				});
		} else {
			console.error('Clipboard API not supported or JSON element not found');
		}
	}
	
</script>

<div class="bg-muted rounded-md border border-gray-200 p-2 text-xs text-gray-800 mt-4">
	<div class="flex items-center justify-between">
		<div class="font-medium uppercase">Data</div>
		<div class="space-x-2">
			<button
				onclick={copyJsonData}
				class="rounded border border-gray-300 px-2 py-1 hover:bg-gray-300 hover:text-gray-900 font-medium">Copy JSON Data</button
			>
			<button
				onclick={() => (isExpanded = !isExpanded)}
				class="rounded border border-gray-300 px-2 py-1 hover:bg-gray-300 hover:text-gray-900 font-medium"
			>
				{#if isExpanded}
					Collapse
				{:else}
					Expand
				{/if}
			</button>
		</div>
	</div>
	{#if isExpanded}
		<pre id="dev-json">{JSON.stringify(data, null, 3)}</pre>
	{/if}
</div>
