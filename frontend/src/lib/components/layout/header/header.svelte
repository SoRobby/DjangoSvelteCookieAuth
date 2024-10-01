<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import * as Avatar from '$lib/components/ui/avatar';
	let { userData } = $props();
</script>

<header class="bg-gray-800">
	<nav class="mx-auto max-w-7xl" aria-label="Global">
		<!-- Desktop -->
		<div class="hidden items-center justify-between py-4 md:flex">
			<div class="flex items-center gap-x-12">
				<div class="flex gap-x-12">
					<a href="/" class="text-sm font-semibold leading-6 text-gray-50 hover:text-gray-100"
						>Home</a
					>
					<a href="/" class="text-sm font-semibold leading-6 text-gray-50 hover:text-gray-100"
						>Page 1</a
					>

					<a href="/" class="text-sm font-semibold leading-6 text-gray-50 hover:text-gray-100"
						>Page 2</a
					>
				</div>
			</div>
			<div class="flex items-center gap-6">
				{#if userData.sessionid}
					<div>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button
									builders={[builder]}
									variant="none"
									size="icon"
									class="flex h-8 w-8 items-center rounded-full"
								>
									<Avatar.Root class="h-8 w-8">
										<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
										<Avatar.Fallback>CN</Avatar.Fallback>
									</Avatar.Root>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content class="w-48">
								<div class="px-2 py-1.5">
									<p class="text-sm font-semibold text-gray-900">{userData.username}</p>
									<p class="text-muted-foreground text-xs">{userData.email}</p>
								</div>
								<DropdownMenu.Separator />
								<DropdownMenu.LinkItem href="/profile">Profile</DropdownMenu.LinkItem>
								<form action="/logout" method="POST">
									<button type="submit" class="w-full">
										<DropdownMenu.Item>Logout</DropdownMenu.Item>
									</button>
								</form>
								{#if userData.is_superuser}
									<DropdownMenu.Separator />
									<div class="text-center pl-2 bg-red-50 w-full">
										<span class="text-xs font-medium rounded px-2 py-1 text-red-700">Type: Superuser</span>
									</div>
								{/if}
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</div>
				{:else}
					<div class="space-x-4">
						<a
							href="/login"
							class="text-muted rounded border border-gray-700 px-3 py-1.5 text-sm hover:border-gray-500"
							>Login</a
						>
						<a
							href="/register"
							class="text-muted rounded border border-gray-700 px-3 py-1.5 text-sm hover:border-gray-500"
							>Register</a
						>
					</div>
				{/if}
			</div>
		</div>

		<div></div>
	</nav>
</header>
