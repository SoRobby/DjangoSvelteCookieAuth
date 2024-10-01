<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	let { data, form } = $props();

	let content = $state('');
	let serverResponse = null;
</script>

<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Server post request using +page.server.ts</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<form method="POST" use:enhance class="space-y-1.5">
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="content">Content</Label>
				<Input type="text" id="content" name="content" bind:value={content} placeholder="Enter random text" />
			</div>
			<Button variant="outline" type="submit">Send POST Request</Button>
		</form>

		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">Data</div>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>

		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">Form</div>
			<pre>{JSON.stringify(form, null, 4)}</pre>
		</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>