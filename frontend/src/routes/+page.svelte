<script lang="ts">
	import { Main } from '$lib/components/layout/main';
	import { Header } from '$lib/components/layout/header';
	import { Footer } from '$lib/components/layout/footer';
	import { Button } from '$lib/components/ui/button';
	let { data } = $props();
</script>

<Header userData={data.user} />
<Main variant="default">
	<div class="grid grid-cols-3 gap-6 rounded-md border border-gray-200 p-4">
		<div class="space-y-2">
			<h2 class="text-lg font-medium">Auth</h2>
			<div class="grid-col grid text-sm">
				{#if !data?.user}
				<a
					href="login/"
					class="w-min text-nowrap font-medium text-gray-700 hover:text-blue-600 hover:underline"
					>Login</a
				>
				<a
					href="register/"
					class="w-min text-nowrap font-medium text-gray-700 hover:text-blue-600 hover:underline"
					>Register</a
				>
				{:else}
				<p class="pb-2">You are logged in as <strong>{data.user.username}</strong></p>
				<form action="/logout" method="POST">
					<Button variant="outline" type="submit">Logout</Button>
				</form>
				{/if}
				
			</div>
		</div>

		<div class="space-y-2">
			<h2 class="text-lg font-medium">Dev</h2>
			<div class="grid-col grid text-sm">
				<a
					href="dev/api"
					class="w-min text-nowrap font-medium text-gray-700 hover:text-blue-600 hover:underline"
					>API Endpoints</a
				>
				<a
					href="dev/api/auth-examples/set-csrf"
					class="w-min text-nowrap font-medium text-gray-700 hover:text-blue-600 hover:underline"
					>CSRF Testing</a
				>
				<a
					href="dev/api/post-examples/server-post-request"
					class="w-min text-nowrap font-medium text-gray-700 hover:text-blue-600 hover:underline"
					>POST Test</a
				>
			</div>
		</div>
	</div>
</Main>
<Footer />
