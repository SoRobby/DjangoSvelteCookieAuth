<script lang="ts">
	import AuthHeading from '../AuthHeading.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import api from '$lib/api/client/auth';

	let email = $state('');
	let password = $state('');
	let rememberMe = $state(false);

	const { form, data } = $props();

	let isSubmitting = $state(false);

	// const handleSubmit: SubmitFunction = () => {
	// 	isSubmitting = true;

	// 	return async ({ update }) => {
	// 		try {
	// 			await update({ reset: false });
	// 		} finally {
	// 			isSubmitting = false;

	// 			// Ensure the element exists before accessing its value
	// 			const passwordInput = document.getElementById('password') as HTMLInputElement | null;
	// 			if (passwordInput) {
	// 				passwordInput.value = ''; // Clear the input field if it exists
	// 			}

	// 			password = ''; // Reset the password variable
	// 		}
	// 	};
	// };


	async function authenticate() {
		console.log('Authenticating...');
		if (password?.length === 0) {
			//warn
			return;
		}
		if (email?.length === 0) {
			//warn
			return;
		}

		const res = await api.login(email, password, rememberMe);
		if (res) {
			window.location.href = '/profile';
		}
	}

</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<AuthHeading title="Sign in to your account" />
	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			<form class="space-y-6" method="POST">
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="email">Email address</Label>
					<Input type="email" name="email" id="email" bind:value={email} required />
				</div>

				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="password">Password</Label>
					<Input type="password" name="password" id="password" bind:value={password} required />
				</div>

				<div class="flex items-center justify-between">
					<div class="flex items-center space-x-2">
						<Checkbox id="remember-me" bind:checked={rememberMe} />
						<Label id="remember-me" for="remember-me" class="text-sm font-normal">Remember me</Label
						>
					</div>
				</div>
				<div>
					{#if !isSubmitting}
						<Button class="w-full" on:click={authenticate} type="button">Sign in</Button>
					{:else}
						<Button disabled variant="ghost" class="w-full" type="button">
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							Signing in...
						</Button>
					{/if}
				</div>
			</form>

			{#if !form?.success}
				<div class="flex justify-center">
					<p class="mt-4 text-sm font-medium text-red-600">{form?.message}</p>
				</div>
			{/if}
		</div>

		<p class="mt-10 text-center text-sm text-gray-500">
			Don't have an account?
			<a href="/register" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
				>Create an account</a
			>
		</p>
	</div>
</div>
