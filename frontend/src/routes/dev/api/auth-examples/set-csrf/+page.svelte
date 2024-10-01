<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	import { Button } from '$lib/components/ui/button';

	import { AUTH_CLIENT_ENDPOINTS } from '$lib/client/endpoints/csrf';

	let formData = $state({});

	async function getCSRFToken() {
		const response = await fetch(AUTH_CLIENT_ENDPOINTS.getCSRFToken.url, {
			method: AUTH_CLIENT_ENDPOINTS.getCSRFToken.methods.POST,
			credentials: 'include'
		});

		if (!response.ok) {
			console.error('Failed to fetch CSRF token');
		}

		console.log('CSRF token set successfully');
		formData = {
			success: true,
			status: response.status,
			data: 'Successfully set CSRF token'
		};
	}

	async function validateCSRFToken() {
		const csrfToken = getCookie('csrftoken') || '';

		console.log('CSRF token:', csrfToken);

		AUTH_CLIENT_ENDPOINTS.validateCSRFToken.url;

		const response = await fetch(AUTH_CLIENT_ENDPOINTS.validateCSRFToken.url, {
			method: AUTH_CLIENT_ENDPOINTS.validateCSRFToken.methods.POST,
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				'X-CSRFToken': csrfToken
			}
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.log('[+PAGE] Error data:', errorData);
			formData = {
				success: false,
				status: response.status,
				data: errorData
			};
		}

		const data = await response.json();
		console.log('[+PAGE] Data:', data);
		formData = {
			success: true,
			status: response.status,
			data: data
		};
	}

	function getCookie(name) {
		const value = `; ${document.cookie}`;
		const parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
</script>

<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Server post request using page.server.js</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<div class="space-y-8">
			<div>
				<Button variant="outline" type="button" onclick={getCSRFToken}>Set CSRF Token</Button>
				<div class="space-y-1 pt-2">
					<p class="text-muted-foreground text-sm">
						Open up chrome inspector, if a csrftoken is already set, try deleting and click the
						button.
					</p>
					<p class="text-muted-foreground text-sm">
						Also, upon page refresh, hooks (hooks.server.ts) will check to see if a csrftoken
						already exists or not. If a token does not already exist, hooks will automatically make
						a call to get a CSRF token from the Django site
					</p>
				</div>
			</div>

			<div>
				<Button variant="outline" type="button" onclick={validateCSRFToken}
					>Validate CSRF Token</Button
				>
				<div class="space-y-1 pt-2">
					<p class="text-muted-foreground text-sm">
						Perform a POST request to the backend to check if the CSRF token/cookie is valid
					</p>
				</div>
			</div>
		</div>

		{#if formData?.success}
			<p class="mt-4 text-sm font-medium text-green-600">
				Success: {formData?.data.success.message}
			</p>
		{:else if formData?.success === false}
			<p class="mt-4 text-sm font-medium text-red-600">Error: {formData?.data.success.message}</p>
		{/if}

		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">formData</div>
			<pre>{JSON.stringify(formData, null, 4)}</pre>
		</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
