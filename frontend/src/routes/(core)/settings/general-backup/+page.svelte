<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label/index.js';
	import Sidebar from '../Sidebar.svelte';

	let { data } = $props();
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
		
		<!-- <form method="POST">
			<div class="space-y-8">
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="first-name">First name</Label>
					<Input type="text" name="first-name" id="first-name" bind:value={data.first_name} />
				</div>
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="last-name">Last name</Label>
					<Input type="text" name="last-name" id="last-name" bind:value={data.last_name} />
				</div>

				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="profile-image">File</Label>
					<Input type="file" name="profile-image" id="profile-image" accept="image/png, image/jpeg" />
				</div>
				<div>
					<Button type="submit">Save</Button>
				</div>
			</div>
		</form> -->


		<form method="POST" enctype="multipart/form-data">
			<div class="space-y-8">
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Label for="profile-image">File</Label>
					<Input type="file" name="profile-image" id="profile-image" accept="image/png, image/jpeg" />
				</div>
				<div>
					<Button type="submit">Save</Button>
				</div>
			</div>
		</form>

	</div>
</div>


<div class="bg-muted mt-4 rounded-md p-2 text-xs border border-gray-200">
	<div class="font-medium uppercase">Data</div>
	<pre>{JSON.stringify(data, null, 4)}</pre>
</div>