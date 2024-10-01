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

	let { data, form } = $props();

	let isSubmitting = $state(false);
	let areChangesSaved = $state(true);

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

		return async ({ update, result }) => {
			try {
				await update({ reset: false });
				if (result.data.success === true) {
					toast.success(result?.data.message);
				} else {
					toast.error(result?.data.message);
				}

				areChangesSaved = true;
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
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Emails</h2>
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
							Marketing emails
						</label>
						<div class="text-xs font-normal text-gray-600">
							Emails about promotions and discounts
						</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-marketing-emails"
							name="receive-marketing-emails"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_marketing_emails}
						/>
					</div>
				</div>

				<!-- Row 2 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-weekly-digest-emails"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Weekly digest
						</label>
						<div class="text-xs font-normal text-gray-600">
							Receive weekly emails about website news and updates
						</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-weekly-digest-emails"
							name="receive-weekly-digest-emails"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_weekly_digest_emails}
						/>
					</div>
				</div>

				<!-- Row 3 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-discovery-emails"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Discovery emails
						</label>
						<div class="text-xs font-normal text-gray-600">
							Receive emails about new features, tips, hints, and tricks
						</div>
					</div>

					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-discovery-emails"
							name="receive-discovery-emails"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_discovery_emails}
						/>
					</div>
				</div>

				<!-- Row 4 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-site-update-emails"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Site updates
						</label>
						<div class="text-xs font-normal text-gray-600">
							Receive important website changes and updates
						</div>
					</div>

					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-site-update-emails"
							name="receive-site-update-emails"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_site_update_emails}
						/>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Notifications</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-inbox-message-notifications"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Inbox messages
						</label>
						<div class="text-xs font-normal text-gray-600">
							Receive notifications when you receive messages
						</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Switch
							id="receive-inbox-message-notifications"
							name="receive-inbox-message-notifications"
							onclick={() => (areChangesSaved = false)}
							checked={data.account.settings.receive_inbox_message_notifications}
						/>
					</div>
				</div>

				<!-- Row 2 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label
							for="receive-announcement-notifications"
							class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6"
						>
							Announcements
						</label>
						<div class="text-xs font-normal text-gray-600">Receive announcement notifications</div>
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
