<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { enhance } from '$app/forms';
	import type { ActionData, SubmitFunction } from './$types';
	import { toast } from 'svelte-sonner';
	import { LoaderCircle } from 'lucide-svelte';
	import Sidebar from '../Sidebar.svelte';
	import { Textarea } from '$lib/components/ui/textarea';
	import { FieldContainer } from '$lib/components/layout/field-container';
	import * as Alert from '$lib/components/ui/alert';

	let { data, form } = $props();
	let isSubmitting = $state(false);
	let isMessageSent = $state(false);

	let name = $state(
		data.account.first_name && data.account.last_name
			? `${data.account.first_name} ${data.account.last_name}`
			: ''
	);
	let email = $state(data.user.email || '');

	const handleSubmit: SubmitFunction = (input) => {
		// Do something before the form is submitted (e.g. show a loader or validate the form)
		isSubmitting = true;

		return async ({ result, update }) => {
			// Do something after the form is submitted (e.g. hide a loader or show a success message)
			isSubmitting = false;
			isMessageSent = true;
			console.log(data.user.email);
			await update();

			// Reset the form to its initial state
			name =
				data.user.first_name && data.user.last_name
					? `${data.user.first_name} ${data.user.last_name}`
					: '';
			email = data.user.email || '';
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
		<Button href="/profile" size="sm" variant="ghost">Cancel</Button>
	</div>
</div>

<div class="flex gap-x-16 py-6">
	<aside class="lg:w-64">
		<Sidebar />
	</aside>
	<div class="flex-1">
		<form method="POST" action="?/submitSupportMessage" use:enhance={handleSubmit}>
			<!-- Header section of form -->
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Contact support</h2>
				<p class="mt-2 text-sm leading-6 text-gray-500">
					Our support team will reach out to you as soon as possible
				</p>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-2 border-t border-gray-200 text-sm">
				<div class="grid grid-cols-6 gap-4 pt-4 md:grid-cols-12 md:gap-8">
					<FieldContainer class="col-span-6">
						<Label for="name">Name</Label>
						<Input type="text" id="name" name="name" bind:value={name} required />
					</FieldContainer>

					<FieldContainer class="col-span-6">
						<Label for="email">Email address</Label>
						<Input type="email" id="email" name="email" bind:value={email} required />
					</FieldContainer>
				</div>

				<FieldContainer class="pt-4">
					<Label for="subject">Subject</Label>
					<Input type="text" id="subject" name="subject" required />
				</FieldContainer>

				<FieldContainer class="pt-4">
					<Label for="content">Message</Label>
					<Textarea id="content" name="content" required />
				</FieldContainer>

				{#if data.account.username}
					<input type="hidden" name="username" value={data.account.username} />
				{:else}
					<input type="hidden" name="username" />
				{/if}
			</div>

			<!-- Form submission buttons -->
			{#if isMessageSent}
				<Alert.Root class="mt-4 bg-green-50 text-green-800">
					<Alert.Title>Support message sent</Alert.Title>
					<Alert.Description
						>Your support message was successfully sent. Our team will get back to you as soon as
						possible.</Alert.Description
					>
				</Alert.Root>
			{:else}
				<div class="flex flex-row items-center justify-end gap-4 pt-4">
					{#if !isSubmitting}
						<Button type="button" variant="ghost" size="sm">Cancel</Button>
						<Button type="submit" size="sm">Send message</Button>
					{:else}
						<Button disabled variant="ghost" type="button">
							<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
							Sending message...
						</Button>
					{/if}
				</div>
			{/if}
		</form>
	</div>
</div>

<div class="bg-muted rounded-md p-2 text-xs">
	<div class="font-medium uppercase">Data</div>
	<pre>{JSON.stringify(data, null, 4)}</pre>
</div>


