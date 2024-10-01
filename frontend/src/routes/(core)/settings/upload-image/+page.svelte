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

	import '@pqina/pintura/pintura.css';
	import { getEditorDefaults, getCropperDefaults } from '@pqina/pintura';
	import { PinturaEditor } from '@pqina/svelte-pintura';

	let inlineResult: string = $state('');

	const cropperDefaults = {
		...getCropperDefaults(),
		cropEnableButtonFlipHorizontal: false, // Disable flip functionality
		cropEnableButtonRotateLeft: false, // Disable rotation functionality
		imageCropAspectRatio: 3 / 2,
		cropEnableRotationInput: false
	};

	import { formatDate } from '$lib/utils/formatDate';

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

<div class="flex justify-center">
	<div class="w-1/3 overflow-hidden rounded-md border border-gray-300 p-4">
		<div class="h-96 w-full overflow-hidden bg-red-100">
			<PinturaEditor
				{...cropperDefaults}
				on:process={(e) => (inlineResult = URL.createObjectURL(e.detail.dest))}
				src="https://upload.wikimedia.org/wikipedia/commons/d/dc/PIA17944-MarsCuriosityRover-AfterCrossingDingoGapSanddune-20140209.jpg"
			/>
		</div>
	</div>
</div>

inlineResult: {inlineResult}

{#if inlineResult}
	<p>
		<img src={inlineResult} alt="" />
	</p>
{/if}

<div class="flex items-center py-6">
	<div class="flex flex-1 items-center space-x-4">
		<Avatar.Root class="h-12 w-12">
			<Avatar.Image src={inlineResult} alt="@{data.account.username}" />
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
