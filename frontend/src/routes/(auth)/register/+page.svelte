<script lang="ts">
	import type { ActionData, SubmitFunction } from './$types';
	import AuthHeading from '../AuthHeading.svelte';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { cn } from '$lib/utils.js';
	import { LoaderCircle } from 'lucide-svelte';

	import { getErrorByField } from '$lib/utils/getErrorByField';

	const { data, form } = $props();

	// Form step state
	let selectedStep = $state('step-1');
	let isSubmitting = $state(false);
	let successfullySubmitted = $state(false);

	// Form state
	let email = $state('');
	let username = $state('');
	let password1 = $state('');
	let password2 = $state('');
	let firstName = $state('');
	let lastName = $state('');
	let country = $state('');
	let organization = $state('');

	// Email validation state
	let isCheckingEmail = $state(false);
	let isEmailValid = $state(true);
	let emailMessage = $state('');

	// Username validation state
	let isCheckingUsername = $state(false);
	let isUsernameValid = $state(true);
	let usernameMessage = $state('');

	// Password1 validation state
	let isPassword1Valid = $state(true);
	let password1Message = $state('');

	// Countries logic
	const countries = $state(data.countries);
	let isCountryListOpen = $state(false);
	let isCountryValid = $state(true);
	let selectedCountryValue = $state('');
	let selectedCountryLabel = $derived(
		countries.find((f: { slug: string }) => f.slug === selectedCountryValue)?.name ?? ''
	);

	function closeAndFocusTrigger(triggerId: string) {
		isCountryListOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});

		country = selectedCountryValue;
		isCountryValid = true;
	}

	// Functions
	const validateEmail = async () => {
		console.log('[validateEmail] Checking email');
		isCheckingEmail = true;

		// Check to see if email is empty
		if (!email && email.length === 0) {
			isEmailValid = true;
			emailMessage = '';
			isCheckingEmail = false;
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/auth/register/validate-email?email=${encodeURIComponent(email)}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			// Parse the response
			const responseData = await response.json();

			if (!response.ok) {
				console.error('Error checking email');
				isEmailValid = false;
				emailMessage = responseData.message || 'Email is invalid';
			} else {
				isEmailValid = responseData.success;
				emailMessage = '';
			}

			console.log(responseData);
		} catch (error) {
			console.error('Network or parsing error', error);
			isEmailValid = false;
			emailMessage = 'Error checking email';
		} finally {
			isCheckingEmail = false;
		}
	};

	const validateUsername = async () => {
		console.log('[validateUsername] Checking username');
		isCheckingUsername = true;

		// Check to see if username is empty
		if (!username && username.length === 0) {
			console.log('Username is empty');
			isUsernameValid = true;
			usernameMessage = '';
			isCheckingUsername = false;
			return;
		}

		try {
			const response = await fetch(
				`http://localhost:8000/api/v1/auth/register/validate-username?username=${encodeURIComponent(username)}`,
				{
					method: 'GET',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);

			// Parse the response
			const responseData = await response.json();

			if (!response.ok) {
				console.error('Error checking username');
				isUsernameValid = false;
				usernameMessage = responseData.message || 'Username is invalid';
			} else {
				isUsernameValid = responseData.success;
				usernameMessage = '';
			}

			console.log(responseData);
		} catch (error) {
			console.error('Network or parsing error', error);
			isUsernameValid = false;
			usernameMessage = 'Error checking username';
		} finally {
			isCheckingUsername = false;
		}
	};

	function changeToStep1() {
		selectedStep = 'step-1';
	}

	function changeToStep2() {
		const requiredInputs = Array.from(
			document.querySelectorAll('.step1-container input[required]')
		) as HTMLInputElement[]; // Explicitly cast to HTMLInputElement[]

		const inputsAreValid = requiredInputs.every((input) => {
			const isValid = input.checkValidity();
			if (!isValid) input.reportValidity();
			return isValid;
		});

		if (inputsAreValid && isEmailValid && isUsernameValid) {
			selectedStep = 'step-2';
		}
	}

	function submitValidator() {
		if (country === '') {
			isCountryValid = false;
			// document.getElementById('country-btn')?.click();
		} else {
			isCountryValid = true;
			const formElm = document.getElementById('register') as HTMLFormElement | null;
			if (formElm) {
				formElm.requestSubmit();
			} else {
				console.error('Form element not found');
			}
		}
	}

	const handleSubmit: SubmitFunction = (event) => {
		isSubmitting = true;

		return async ({ result, update }) => {
			try {
				// Make the update call
				await update({ reset: false });

				console.log(result)

				// Check if response was successful
				if (result?.data?.success === true) {
					console.log('Server response indicates success');
				}

				// Handle failure case
				else if (result?.data?.success === false) {
					console.log('Server response indicates failure');

					// Get the error message
					emailMessage = getErrorByField(result?.data.errors, 'email');
					usernameMessage = getErrorByField(result?.data.errors, 'username');
					password1Message = getErrorByField(result?.data.errors, 'password1');

					// Handle validation errors for email
					if (emailMessage) {
						isEmailValid = false;
					} else {
						isEmailValid = true;
					}

					// Username errors
					if (usernameMessage) {
						isUsernameValid = false;
					} else {
						isUsernameValid = true;
					}

					// Password validation
					if (password1Message) {
						isPassword1Valid = false;
					} else {
						isPassword1Valid = true;
					}

					// Reset the form state
					selectedStep = 'step-1';
					password1 = '';
					password2 = '';
				}
			} catch (error) {
				// Handle unexpected errors (like network issues)
				console.log('An unexpected error occurred', error);
			} finally {
				// Ensure isSubmitting is reset regardless of success or failure
				isSubmitting = false;
			}
		};
	};

	// Admin functions for testing that will be removed
	function loadTestData() {
		// Generate a random email
		email = 'helloworld@helloworld.com';
		username = 'helloworld';
		password1 = 'password';
		password2 = 'password';
		firstName = 'Hello';
		lastName = 'World';
	}

	function loadAdminData() {
		email = 'admin@admin.com';
		username = 'admin99';
		password1 = 'password';
		password2 = 'password';
		firstName = 'Hello';
		lastName = 'World';
		country = 'United States';
		organization = 'My Organization Name';
	}
</script>

<div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
	<AuthHeading title="Create your account" />

	<div class="flex items-center justify-center gap-4 pt-4">
		<Button onclick={loadTestData}>Load test data</Button>
		<Button onclick={loadAdminData}>Load admin data</Button>
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
		<div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
			{#if !successfullySubmitted}
				<form class="space-y-6" id="register" method="POST" use:enhance={handleSubmit}>
					<nav aria-label="Progress">
						<ol role="list" class="space-y-4 md:flex md:space-x-8 md:space-y-0">
							<li class="md:flex-1">
								<button type="button" class="w-full text-left" onclick={() => changeToStep1()}>
									<div
										class="flex flex-col border-l-4 border-indigo-600 pl-4 pt-2 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0"
										aria-current="step"
									>
										<span class="text-sm font-medium text-indigo-600">Step 1</span>
									</div>
								</button>
							</li>
							<li class="md:flex-1">
								{#if selectedStep === 'step-2'}
									<button type="button" class="w-full text-left" onclick={() => changeToStep2()}>
										<div
											class="flex flex-col border-l-4 border-indigo-600 pl-4 pt-2 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0"
											aria-current="step"
										>
											<span class="text-sm font-medium text-indigo-600">Step 2</span>
										</div>
									</button>
								{:else}
									<button type="button" class="w-full text-left" onclick={() => changeToStep2()}>
										<div
											class="group flex flex-col border-l-4 border-gray-200 pl-4 pt-2 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0"
										>
											<span class="text-sm font-medium text-gray-500 group-hover:text-gray-700"
												>Step 2</span
											>
										</div>
									</button>
								{/if}
							</li>
						</ol>
					</nav>

					<div class="space-y-6 {selectedStep === 'step-2' ? 'hidden' : ''}">
						<!-- Email section -->
						<div class="step1-container flex w-full max-w-sm flex-col gap-1.5">
							<Label for="email">Email address</Label>
							<Input
								type="email"
								name="email"
								id="email"
								maxlength={255}
								required
								bind:value={email}
								class={isEmailValid ? '' : 'border-red-300'}
								on:blur={validateEmail}
							/>
							{#if emailMessage}
								<p class="text-sm text-red-600">{emailMessage}</p>
							{/if}
						</div>

						<!-- Username section -->
						<div class="step1-container flex w-full max-w-sm flex-col gap-1.5">
							<Label for="username">Username</Label>
							<Input
								type="text"
								name="username"
								id="username"
								minlength={4}
								maxlength={16}
								required
								bind:value={username}
								class={isUsernameValid ? '' : 'border-red-300'}
								on:blur={validateUsername}
							/>
							{#if usernameMessage}
								<p class="text-sm text-red-600">{usernameMessage}</p>
							{/if}
						</div>

						<!-- Password section -->
						<div class="step1-container flex w-full max-w-sm flex-col gap-1.5">
							<Label for="password1">Password</Label>
							<Input
								type="password"
								name="password1"
								id="password1"
								required
								class={!isPassword1Valid ? 'border-red-300' : ''}
								bind:value={password1}
							/>
							{#if !isPassword1Valid}
								<p class="text-sm text-red-600">{password1Message}</p>
							{/if}
						</div>

						<!-- Password confirmation -->
						<div class="step1-container flex w-full max-w-sm flex-col gap-1.5">
							<Label for="password2">Confirm password</Label>
							<Input
								type="password"
								name="password2"
								id="password2"
								required
								class={!isPassword1Valid ? 'border-red-300' : ''}
								bind:value={password2}
							/>
						</div>

						<!-- Continue to next step -->
						<div>
							<Button
								type="button"
								onclick={() => changeToStep2()}
								disabled={!isEmailValid || !isUsernameValid}
								class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>Continue</Button
							>
						</div>

						{#if !form?.success}
							<p class="mt-4 text-center text-sm font-medium text-red-600">
								{form?.message}
							</p>
						{/if}
					</div>

					{#if selectedStep === 'step-2'}
						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="first-name">First name</Label>
							<Input
								type="text"
								name="first-name"
								id="first-name"
								maxlength={120}
								required
								bind:value={firstName}
							/>
						</div>

						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="last-name">Last name</Label>
							<Input
								type="text"
								name="last-name"
								id="last-name"
								maxlength={120}
								required
								bind:value={lastName}
							/>
						</div>

						<div class="step1-container relative flex w-full max-w-sm flex-col gap-1.5">
							<Label for="country">Country</Label>
							<input hidden name="country" bind:value={country} />
							<div>
								<Popover.Root bind:open={isCountryListOpen} let:ids>
									<Popover.Trigger asChild let:builder>
										<Button
											builders={[builder]}
											id="country-btn"
											variant="outline"
											role="combobox"
											aria-expanded={isCountryListOpen}
											class={isCountryValid
												? 'w-full justify-between'
												: 'w-full justify-between border-red-300'}
										>
											<span class="font-normal">
												{selectedCountryLabel}
											</span>
											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
										{#if !isCountryValid}
											<p class="text-sm text-red-600">Select a country</p>
										{/if}
									</Popover.Trigger>
									<Popover.Content class="w-[384px] p-0">
										<Command.Root>
											<Command.Input
												id="country"
												name="country"
												required
												placeholder="Search country..."
											/>
											<Command.Empty>No country found.</Command.Empty>
											<Command.Group>
												<Command.CommandList>
													{#each countries as country}
														<Command.Item
															value={country.slug}
															onSelect={(currentValue) => {
																selectedCountryValue = currentValue;
																console.log('currentValue', country.name);
																closeAndFocusTrigger(ids.trigger);
															}}
														>
															<Check
																class={cn(
																	'mr-2 h-4 w-4',
																	selectedCountryValue !== country.slug && 'text-transparent'
																)}
															/>
															{country.name}
														</Command.Item>
													{/each}
												</Command.CommandList>
											</Command.Group>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
							</div>
						</div>

						<div class="flex w-full max-w-sm flex-col gap-1.5">
							<Label for="organization">Organization</Label>
							<Input
								type="text"
								name="organization"
								id="organization"
								maxlength={255}
								required
								bind:value={organization}
							/>
						</div>

						<div>
							{#if !isSubmitting}
								<Button
									type="button"
									onclick={submitValidator}
									class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
									>Create account</Button
								>
							{:else}
								<Button disabled variant="ghost" class="w-full" type="button">
									<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
									Creating account...
								</Button>
							{/if}
						</div>
					{/if}
				</form>
			{:else}
				<div class="space-y-2 text-center">
					<div class="text-lg font-medium">Account successfully created</div>
					<div class="text-muted-foreground text-sm">Navigating to the home page...</div>
				</div>
			{/if}
		</div>

		{#if !successfullySubmitted}
			<p class="mt-10 text-center text-sm text-gray-500">
				Already have an account?
				<a href="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
					>Login here</a
				>
			</p>
		{/if}
	</div>
</div>
