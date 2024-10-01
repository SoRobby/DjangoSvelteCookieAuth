<script>
	import { SidebarLink } from '$lib/components/dev/sidebar-link';
	import { page } from '$app/stores';

	let { children } = $props();
</script>

<div class="flex-1">
	<div class="container flex-1 items-start md:grid md:grid-cols-12 md:gap-6 lg:gap-10">
		<aside
			class="custom-scrollbar fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto md:sticky md:col-span-4 md:block xl:col-span-3"
		>
			<div class="h-full pr-4">
				<div class="w-full">
					<!-- GET requests -->
					<div class="pb-4">
						<h4 class="mb-1 rounded-md py-1 text-sm font-medium">GET Requests</h4>
						<div class="grid grid-cols-1 text-sm">
							<SidebarLink name="Load data from +page.js" link="/dev/api/get-examples/load-data-pagejs" />
							<SidebarLink name="Client GET request" link="/dev/api/get-examples/client-get-request" />
							<SidebarLink name="Server GET request" link="/dev/api/get-examples/server-get-request" />
						</div>
					</div>

					<!-- POST requests -->
					<div class="pb-4">
						<h4 class="mb-1 rounded-md py-1 text-sm font-medium">POST Requests</h4>
						<div class="grid grid-cols-1 text-sm">
							<SidebarLink name="Client POST request" link="/dev/api/post-examples/client-post-request" />
							<SidebarLink name="Server POST request" link="/dev/api/post-examples/server-post-request" />
							<SidebarLink name="Server POST request Enhance" link="/dev/api/post-examples/server-post-request-enhance" />
						</div>
					</div>

					<div class="pb-4">
						<h4 class="mb-1 rounded-md py-1 text-sm font-medium">Authentication</h4>
						<div class="grid grid-cols-1 text-sm">
							<SidebarLink name="CSRF Testing" link="/dev/api/auth-examples/set-csrf" />
							<SidebarLink name="Login" link="/dev/api/auth-examples/login" />
							<SidebarLink name="Logout" link="/dev/api/auth-examples/logout" />
						</div>
					</div>
					
				</div>
			</div>
		</aside>

		<section class="relative space-y-4 md:col-span-8 lg:gap-10 xl:col-span-9">
			{@render children()}
		</section>
	</div>
</div>
