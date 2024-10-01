<script lang="ts">
	import { page } from '$app/stores';
</script>

<nav class="flex-none px-4 sm:px-6 lg:px-0">
	<ul role="list" class="gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
		<li>
			{#if $page.url.pathname === '/settings/general'}
				<a
					href="/settings/general/"
					class="flex gap-x-3 rounded-md bg-gray-100 py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600"
				>
					General
				</a>
			{:else}
				<a
					href="/settings/general"
					class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
				>
					General
				</a>
			{/if}
		</li>

		<li>
			{#if $page.url.pathname === '/settings/notifications'}
				<a
					href="/settings/notifications"
					class="flex gap-x-3 rounded-md bg-gray-100 py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600"
				>
					Notifications
				</a>
			{:else}
				<a
					href="/settings/notifications"
					class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
				>
					Notifications
				</a>
			{/if}
		</li>

		<li>
			{#if $page.url.pathname === '/settings/security'}
				<a
					href="/settings/security"
					class="flex gap-x-3 rounded-md bg-gray-100 py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600"
				>
					Security
				</a>
			{:else}
				<a
					href="/settings/security"
					class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
				>
					Security
				</a>
			{/if}
		</li>

		<li>
			{#if $page.url.pathname === '/settings/membership'}
				<a
					href="/settings/membership"
					class="flex gap-x-3 rounded-md bg-gray-100 py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600"
				>
					Membership
				</a>
			{:else}
				<a
					href="/settings/membership"
					class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
				>
					Membership
				</a>
			{/if}
		</li>

		<li>
			{#if $page.url.pathname === '/settings/support'}
				<a
					href="/settings/support"
					class="flex gap-x-3 rounded-md bg-gray-100 py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600"
				>
					Support
				</a>
			{:else}
				<a
					href="/settings/support"
					class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
				>
					Support
				</a>
			{/if}
		</li>

		<hr class="mt-4 pb-4" />
		<li>
			<a
				href="/adminpanel/components/"
				class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
			>
				Components
			</a>
		</li>
		<li>
			<a
				href="/adminpanel/home/"
				class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
			>
				Admin panel
			</a>
		</li>

		<li>
			<a
				href="/admin/"
				class="flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-gray-800"
			>
				Django panel
			</a>
		</li>
	</ul>
</nav>
