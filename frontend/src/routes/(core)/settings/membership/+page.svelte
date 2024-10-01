<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Switch } from '$lib/components/ui/switch';
	import { LoaderCircle } from 'lucide-svelte';
	import Sidebar from '../Sidebar.svelte';

	let { data } = $props();

	let isSubmitting = $state(false);
	let areChangesSaved = $state(true);
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
				<h2 class="text-2xl font-semibold leading-7 text-gray-900">Membership</h2>
			</div>

			<!-- Form contents -->
			<div class="mt-4 space-y-4 divide-y divide-gray-100 border-t border-gray-200 text-sm">
				<!-- Row 1 -->
				 <div class="mt-4">
					<div class="grid grid-cols-1 gap-2 pt-2 md:grid-cols-12 md:gap-12 md:pt-4 border p-4 rounded-md items-center">
						<div class="col-span-12 flex-row items-center md:col-span-6">
							<p class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">
								No active subscription
							</p>
						</div>
	
						<div class="col-span-12 flex items-center md:col-span-6 md:justify-end text-blue-600 font-medium">View plans</div>
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
