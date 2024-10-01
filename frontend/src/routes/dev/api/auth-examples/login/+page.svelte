<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';

	import { getContext } from 'svelte';
	const user = getContext('user');

	const { form } = $props();

	let csrfToken = $state('');
	let sessionid = $state('');
	let username = $state('');
	let isLoggedIn = $state(false);
	let isSuperUser = $state(null);

	let isSubmitting = $state(false);
	let errorMessage = $state('');

	let email = $state('admin@admin.com');
	let password = $state('admin');

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result, update }) => {
			try {
				if (result.type === 'success') {
					console.log('Form submitted successfully');
					// console.log(result.data?.serverResponse)
					// Update the state with the response from the server
					sessionid = result.data?.serverResponse.sessionid;
					username = result.data?.serverResponse.username;
					isSuperUser = result.data?.serverResponse.is_superuser;

					// Set the runes context
					// user.username = username;
					// user.email = email;

					isLoggedIn = true;
					errorMessage = '';
				} else if (result.type === 'failure') {
					console.log('Form submission failed');
				}
				await update();
			} catch (error) {
				console.log('Error: ' + error);
				console.log(result.data.message);
				errorMessage = result.data.message;
			} finally {
				isSubmitting = false;
			}
		};
	};

	function loadAdminCredentials() {
		email = 'admin@admin.com';
		password = 'admin';
	}

	function loadUserCredentials() {
		email = 'user@user.com';
		password = 'user';
	}

	function loadIncorrectUserCredentials() {
		email = 'badcreds@badcreds.com';
		password = 'badcreds';
	}
</script>

<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Server post request using page.server.js</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<form method="POST" class="space-y-1.5" use:enhance={handleSubmit}>
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="email">Email address</Label>
				<Input type="email" id="email" name="email" bind:value={email} />
			</div>
			<div class="flex w-full max-w-sm flex-col gap-1.5">
				<Label for="password">Password</Label>
				<Input type="password" id="password" name="password" bind:value={password} />
			</div>
			<Button variant="outline" type="submit" disabled={isSubmitting}>
				{isSubmitting ? 'Logging in...' : 'Login'}
			</Button>

			{#if errorMessage}
				<p class="text-red-500">{errorMessage}</p>
			{/if}
		</form>

		<div class="py-4 space-x-4">
			<Button variant="outline" size="sm" onclick={loadAdminCredentials}>Load admin credentials</Button>
			<Button variant="outline" size="sm" onclick={loadUserCredentials}>Load user credentials</Button>
			<Button variant="outline" size="sm" onclick={loadIncorrectUserCredentials}>Load incorrect user credentials</Button>
		</div>

		<div class="text-muted-foreground my-4 text-sm">
			<div>
				from = {JSON.stringify(form)}
			</div>
			<div>
				csrfToken = {csrfToken}
			</div>
			<div>
				sessionid = {sessionid}
			</div>
			<div>
				isLoggedIn = {isLoggedIn}
			</div>
			<div>
				username = {username}
			</div>
			<div>
				isSuperUser = {isSuperUser}
			</div>
		</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
