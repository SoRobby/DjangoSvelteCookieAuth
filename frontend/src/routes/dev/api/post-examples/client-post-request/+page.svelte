<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';

	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	let content = $state('');
	let responseData = $state(null);
	let form: HTMLFormElement;

	async function handleSubmit(event: Event) {
		event.preventDefault();

		// Get CSRF token and ensure it's a string
		const csrfToken = getCookie('csrftoken') || '';

		console.log(csrfToken);

		const response = await fetch('http://localhost:8000/api/v1/hello-world-post', {
			method: 'POST',
			credentials: 'include',
			headers: { 
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken,
			},
			body: JSON.stringify({ content: content })
		});

		// Check for any errors
		if (!response.ok) {
			console.log('[+PAGE.JS] Error response');
			const data = await response.json();
			console.log('[+PAGE.JS] Error:', data);
			return data;
		}

		// Handle the response
		const data = await response.json();
		console.log('[+PAGE.JS] Success data:', data);
		responseData = data;
		
		// Reset the form (optional)
		form.reset();
		
		return data;
	}

	function getCookie(name: string) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
	
</script>

<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Client post request using +page.js</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<form bind:this={form} onsubmit={handleSubmit} class="space-y-1.5">
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="content">Content</Label>
				<Input type="text" id="content" bind:value={content} placeholder="Enter random text" />
			</div>
			<Button variant="outline" type="submit">Send POST Request</Button>
		</form>

		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">Data</div>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>

		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">responseData</div>
			<pre>{JSON.stringify(responseData, null, 4)}</pre>
		</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
