<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from './$types';
	import { toast } from 'svelte-sonner';
	import { LoaderCircle } from 'lucide-svelte';
	import Sidebar from '../Sidebar.svelte';
	import { FieldContainer } from '$lib/components/layout/field-container';
	import Check from 'lucide-svelte/icons/check';
	import { Textarea } from '$lib/components/ui/textarea';
	import * as Command from '$lib/components/ui/command/index.js';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { tick } from 'svelte';
	import { cn } from '$lib/utils.js';

	import { formatDate } from '$lib/utils/formatDate';

	let { data, form } = $props();

	let isSubmitting = $state(false);
	let areChangesSaved = $state(true);

	// Form state
	let first_name = $state(data.account.first_name);
	let last_name = $state(data.account.last_name);
	let bio = $state(data.account.bio);
	let country = $state(data.account.country.slug);

	// Countries logic
	const countries = $state(data.countries);
	let isCountryListOpen = $state(false);
	let selectedCountryValue = $state(data.account.country.slug);
	let selectedCountryLabel = $derived(
		countries.find((f: { slug: string }) => f.slug === selectedCountryValue)?.name ?? ''
	);

	function closeAndFocusTrigger(triggerId: string) {
		isCountryListOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});

		country = selectedCountryValue;
		areChangesSaved = false;
	}

	function submitForm() {
		const formElm = document.getElementById('notifications-form') as HTMLFormElement | null;
		if (formElm) {
			formElm.requestSubmit();
		} else {
			console.error('Form element not found');
		}
	}

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result, update }) => {
			try {
				if (result.type) {
					await update({ reset: false });

					if (result.data.success === true) {
						toast.success(result?.data.message);
						areChangesSaved = true;
					} else {
						toast.error(result?.data.message);
					}
				}
			} catch (error) {
			} finally {
				isSubmitting = false;
			}
		};
	};
</script>

<div class="flex items-center py-6">
	<div class="flex flex-1 items-center space-x-4">
		<Avatar.Root class="h-12 w-12">
			<Avatar.Image src="https://github.com/shadcn.png" alt="@{data.account.username}" />
			<Avatar.Fallback>{data.account.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
		</Avatar.Root>
		<div>
			<h1 class="text-2xl font-semibold text-gray-800">
				{data.account.first_name}
				{data.account.last_name}
			</h1>
			<p class="text-sm font-medium text-gray-500">@{data.account.username}</p>
		</div>
	</div>
	<div class="space-x-4">
		{#if !isSubmitting}
			<Button href="/profile" size="sm" variant="ghost">Cancel</Button>
			{#if !areChangesSaved}
				<Button type="button" onclick={submitForm} size="sm">Save changes</Button>
			{/if}
		{:else}
			<div>
				<Button disabled variant="ghost" class="w-full" type="button">
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
					Saving...
				</Button>
			</div>
		{/if}
	</div>
</div>

<div class="flex gap-x-16 py-6">
	<aside class="lg:w-64">
		<Sidebar />
	</aside>
	<form class="flex-1 space-y-12" id="notifications-form" method="POST" use:enhance={handleSubmit}>
		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Profile</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-marketing-emails"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Username
						</label>
						<div class="text-xs font-normal text-gray-600">
							Username is public and cannot be changed
						</div>
					</div>
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						{data.account.username}
					</div>
				</div>

				<!-- Row 2 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="first-name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							First name
						</label>
						<div class="text-xs font-normal text-gray-600">First name</div>
					</div>
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						<Input
							type="text"
							name="first-name"
							id="first-name"
							class="max-w-full"
							required
							bind:value={first_name}
							onkeydown={() => (areChangesSaved = false)}
						/>
					</div>
				</div>

				<!-- Row 3 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="last-name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Last name
						</label>
						<div class="text-xs font-normal text-gray-600">Last name</div>
					</div>
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						<Input
							type="text"
							name="last-name"
							id="last-name"
							class="max-w-full"
							required
							bind:value={last_name}
							onkeydown={() => (areChangesSaved = false)}
						/>
					</div>
				</div>

				<!-- Row 3 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-weekly-digest-emails"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Profile picture
						</label>
						<div class="text-xs font-normal text-gray-600">
							Upload a png, jpg up to 1 MB (recommended size 400 x 400 px)
						</div>
					</div>
					<div class="col-span-12 flex items-center gap-4 md:col-span-6 md:justify-start">
						<Avatar.Root class="h-10 w-10">
							<Avatar.Image src="https://github.com/shadcn.png" alt="@{data.account.username}" />
							<Avatar.Fallback>{data.account.username.slice(0, 2).toUpperCase()}</Avatar.Fallback>
						</Avatar.Root>
						<Button type="button" variant="outline" size="sm">Upload profile image</Button>
					</div>
				</div>

				<!-- Row 4 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="bio" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							About you
						</label>
						<div class="text-xs font-normal text-gray-600">Short description about yourself</div>
					</div>
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						<Textarea
							name="bio"
							id="bio"
							placeholder="Type your message here."
							bind:value={bio}
							onkeydown={() => (areChangesSaved = false)}
						/>
					</div>
				</div>

				<!-- Row 5 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="country" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Country
						</label>
						<div class="text-xs font-normal text-gray-600">Country you reside in</div>
					</div>
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						<input hidden name="country" bind:value={country} />
						<div class="w-full">
							<Popover.Root bind:open={isCountryListOpen} let:ids>
								<Popover.Trigger asChild let:builder>
									<Button
										builders={[builder]}
										id="country"
										variant="outline"
										role="combobox"
										aria-expanded={isCountryListOpen}
										class="w-full justify-between"
									>
										<span class="font-normal">
											{selectedCountryLabel}
										</span>
										<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</Popover.Trigger>
								<Popover.Content class="w-[400px] p-0">
									<Command.Root value={country}>
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
				</div>
			</div>
		</div>

		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Privacy</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-announcement-notifications"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Show name
						</label>
						<div class="text-xs font-normal text-gray-600">
							If disabled, your username will be shown instead
						</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-announcement-notifications"
							name="receive-announcement-notifications"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_announcement_notifications}
						/>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Metrics</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<p class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Date joined</p>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-start">
						{formatDate(data.account.date_created)}
					</div>
				</div>
			</div>
		</div>

		<div class="flex justify-end space-x-4">
			{#if !isSubmitting}
				<Button variant="ghost" href="/profile" size="sm">Cancel</Button>
				{#if !areChangesSaved}
					<Button type="button" onclick={submitForm} size="sm">Save changes</Button>
				{/if}
			{:else}
				<div>
					<Button disabled variant="ghost" class="w-full" type="button">
						<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
						Saving...
					</Button>
				</div>
			{/if}
		</div>
	</form>
</div>

<div class="bg-muted rounded-md p-2 text-xs">
	<div class="font-medium uppercase">Data</div>
	<pre>{JSON.stringify(data, null, 4)}</pre>
</div>
