<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import type { ActionData, SubmitFunction } from './$types';
	import { toast } from 'svelte-sonner';
	import { Badge } from '$lib/components/ui/badge';
	import { LoaderCircle } from 'lucide-svelte';
	import Sidebar from '../Sidebar.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { FieldContainer } from '$lib/components/layout/field-container';
	import * as Alert from '$lib/components/ui/alert';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { goto } from '$app/navigation';

	let { data, form } = $props();

	let isDeleting = $state(false);
	let uuid = $state(data.account.uuid);
	let password = $state('');

	const handleDelete: SubmitFunction = () => {
		isDeleting = true;

		return async ({ result, update }) => {
			try {
				if (result.type) {
					await update({ reset: false });
					if (result?.data.success) {
						toast.success(result?.data.message);
						goto('/');
					} else {
						toast.error(result?.data.message);
						password = '';
					}
				}
			} catch (error) {
			} finally {
				isDeleting = false;
			}

			await applyAction(result);

			console.log('result: ', result);
			console.log('form: ', form);
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
</div>

<div class="flex gap-x-16 py-6">
	<aside class="lg:w-64">
		<Sidebar />
	</aside>
	<div class="flex-1 space-y-12">
		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Email and password</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Email verification
						</label>
						<div class="text-xs font-normal text-gray-600">Your email is verified.</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						{#if data.account.is_email_verified}
							<Badge variant="outline">Verified</Badge>
						{:else}
							<div class="space-y-1.5">
								<div>
									<Badge variant="outline">Not verified</Badge>
								</div>
								<Button variant="ghost" size="sm">Re-send verification email</Button>
							</div>
						{/if}
					</div>
				</div>

				<!-- Row 2 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Change email
						</label>
						<div class="text-xs font-normal text-gray-600">Change your accounts login email.</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Button variant="ghost" size="sm">Change email</Button>
					</div>
				</div>

				<!-- Row 3 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Change password
						</label>
						<div class="text-xs font-normal text-gray-600">Change your accounts password.</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<Button variant="ghost" size="sm">Change password</Button>
					</div>
				</div>
			</div>
		</div>

		<div>
			<div>
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Danger zone</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4">
					<div class="col-span-12 flex-row items-center md:col-span-6">
						<label for="name" class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
							Delete account
						</label>
						<div class="text-xs font-normal text-gray-600">
							Once you delete your account, there is no going back.
						</div>
					</div>

					<!-- button -->
					<div class="col-span-12 flex items-center md:col-span-6 md:justify-end">
						<AlertDialog.Root>
							<AlertDialog.Trigger asChild let:builder>
								<Button builders={[builder]} variant="ghost" size="sm">Delete account</Button>
							</AlertDialog.Trigger>
							<AlertDialog.Content>
								<form
									action="?/deleteAccount"
									method="POST"
									use:enhance={handleDelete}
									class="gap-4"
								>
									<AlertDialog.Header>
										<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
										<AlertDialog.Description>
											This action cannot be undone. This will permanently delete your account and
											remove your data from our servers.
											<FieldContainer class="pt-4">
												<Label for="password">Password</Label>
												<Input
													type="password"
													id="password"
													name="password"
													bind:value={password}
													required
												/>
											</FieldContainer>
											<Input type="hidden" id="uuid" name="uuid" bind:value={uuid} required />
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer class="pt-4">
										{#if !isDeleting}
											<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
										{/if}
										<Button type="submit" disabled={isDeleting}>
											{isDeleting ? 'Deleting...' : 'Delete'}
										</Button>
									</AlertDialog.Footer>
								</form>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="bg-muted rounded-md p-2 text-xs">
	<div class="font-medium uppercase">Data</div>
	<pre>{JSON.stringify(data, null, 4)}</pre>
</div>
