<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tabs from '$lib/components/ui/tabs';

	const { children, code } = $props();

	// Svelte 5 set reactive value
	let copyCodeBtnText = $state('Copy code');
	let isCopiedClass = $state('');
	let isCopied = $state(false);

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(code.trim());
			copyCodeBtnText = 'Code copied';
			isCopiedClass = 'text-muted-foreground';

			isCopied = true;
			setTimeout(() => {
				copyCodeBtnText = 'Copy code';
				isCopiedClass = '';
				isCopied = false;
			}, 3200); // Reset after 3.2 seconds
		} catch (err) {
			console.error('Failed to copy: ', err);
		}
	}
</script>

<div class="flex items-center justify-between gap-8 border-b">
	<div class="flex items-center gap-8">
		<h3 class="text-lg font-medium text-gray-800">
			{@render children()}
		</h3>
		<Tabs.List class="bg-white pb-0 shadow-none">
			<Tabs.Trigger
				class="-mb-1 rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:border-muted-foreground data-[state=active]:shadow-none"
				value="preview"
				>Preview
			</Tabs.Trigger>
			{#if code !== undefined}
				<Tabs.Trigger
					class="-mb-1 rounded-none shadow-none data-[state=active]:border-b-2 data-[state=active]:border-muted-foreground data-[state=active]:shadow-none"
					value="code"
					>Code
				</Tabs.Trigger>
			{/if}
		</Tabs.List>
	</div>
	{#if code !== undefined}
		<div>
			<Button variant="ghost" size="sm" on:click={copyToClipboard} class={isCopiedClass}
				>{copyCodeBtnText}</Button
			>
		</div>
	{/if}
</div>
