<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import * as Select from '$lib/components/ui/select';
	import { applyAction, enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';

	const { data, form } = $props();

	let isSubmitting = $state(false);
	let requestType = $state('200-success-single-country');
	let requestTypeSelected = $state({ value: '200-success-single-country', label: '200: Success (Single Country)' });

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result, update }) => {
			try {
				if (result.type === 'success' || result.type === 'failure') {
					await update();
				}
			} catch (error) {
			} finally {
				isSubmitting = false;
			}

			await applyAction(result);

			console.log('result: ', result);
			console.log('form: ', form);
		};
	};
</script>


<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Server post request using page.server.js</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<form method="POST" class="space-y-1.5" use:enhance={handleSubmit}>
			<div class="grid grid-cols-2 gap-6">
				<div class="flex w-full flex-col gap-1.5">
					<Label for="content">Content</Label>
					<Input type="text" id="content" name="content" placeholder="Enter random text" />
				</div>

				<div class="flex w-full flex-col gap-1.5">
					<Label for="content">Request type</Label>
					
					
					<Select.Root bind:selected={requestTypeSelected}>
						<Select.Trigger class="w-full">
							<Select.Value />
						</Select.Trigger>
						<Select.Content>
							<Select.Item onclick={() => (requestType = '200-success-single-country')} value="200-success-single-country"
								>200: Success (Single Country)</Select.Item
							>
							<Select.Item onclick={() => (requestType = '200-success-list-countries')} value="200-success-list-countries"
								>200: Success (List Countries)</Select.Item
							>
							<Select.Item onclick={() => (requestType = '204-success')} value="204-success"
								>204: Success (No Content)</Select.Item
							>
							<Select.Item onclick={() => (requestType = '400-bad-request')} value="400-bad-request"
								>400: Client Bad Request</Select.Item
							>
							<Select.Item onclick={() => (requestType = '403-forbidden')} value="403-forbidden"
								>403: Client Forbidden</Select.Item
							>
							<Select.Item
								onclick={() => (requestType = '500-internal-server-error')}
								value="500-internal-server-error">500: Server Internal Error</Select.Item
							>
						</Select.Content>
						<Select.Input name="request-type" />
					</Select.Root>

					requestType: {requestType}

					<div class="text-muted-foreground text-sm">
						{#if requestType === '200-success-single-country' || requestType === '200-success-list-countries' }
							<p class="font-medium">HTTP 200 OK</p>
							<p>
								The request succeeded. The result meaning of "success" depends on the HTTP method:
							</p>
						{:else if requestType === '400-bad-request'}
							<p class="font-medium">HTTP 400 Bad Request</p>
							<p>
								The server cannot or will not process the request due to something that is perceived
								to be a client error (e.g., malformed request syntax, invalid request message
								framing, or deceptive request routing).
							</p>
						{:else if requestType === '403-forbidden'}
							<p class="font-medium">HTTP 403 Forbidden</p>
							<p>
								The client does not have access rights to the content; that is, it is unauthorized,
								so the server is refusing to give the requested resource. Unlike 401 Unauthorized,
								the client's identity is known to the server.
							</p>
						{:else if requestType === '500-internal-server-error'}
							<p class="font-medium">HTTP 500 Internal Server Error</p>
							<p>The server has encountered a situation it does not know how to handle.</p>
						{/if}
						<div class="mt-2">
							<a
								class="font-medium text-blue-500 hover:underline"
								href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#successful_responses"
								>Reference</a
							>
						</div>
					</div>
				</div>
			</div>

			<Button variant="outline" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Sending...' : 'Send POST Request'}
			</Button>
		</form>

		{#if form?.success}
			<p class="mt-4 text-sm font-medium text-green-600">Success: {form?.message}</p>
		{:else}
			<p class="mt-4 text-sm font-medium text-red-600">Error: {form?.message}</p>
		{/if}

		<div class="bg-muted mt-4 rounded-md p-2 text-xs border border-gray-200">
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
