<script>
	import { page } from '$app/stores';
</script>

<div class="screen-full absolute h-full w-full bg-gray-50">
	<div class="flex min-h-full flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
		<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[540px]">
			<div class="rounded-lg bg-white px-6 py-12 shadow sm:px-12">
				<div class="space-y-6 font-mono">
					<h1 class="text-6xl font-medium text-gray-700"><strong>Error {$page.status}</strong></h1>
					<div>
						<div class="rounded-md border border-gray-200 bg-gray-50 p-2 text-sm text-gray-700">
							<div class="font-medium"><strong>Message</strong></div>
							<div>
								{#if $page.status === 400}
									Your command was garbled in the cosmic static.
								{:else if $page.status === 403}
									This sector is under alien quarantine.
								{:else if $page.status === 404}
									The cosmic object you were looking for has disappeared beyond the event horizon.
								{:else if $page.status === 500}
									Our systems are experiencing a solar flare disruption.
								{:else}
									{$page?.error?.message}
								{/if}
							</div>
						</div>
						<p class="text-muted-foreground pt-2 text-xs">Error has been logged and reported.</p>
						<div>
							<p class="text-muted-foreground pt-2 text-xs">
								If the issue persists please contact our support team.
							</p>
							<strong>
								<a href="/about#support" class="text-xs text-blue-600 hover:underline"
									>Contact Support</a
								>
							</strong>
						</div>
					</div>
					<div class="flex justify-center border-t pt-6">
						<a
							href="/"
							class="rounded px-2 py-1.5 font-semibold text-blue-600 hover:bg-gray-50 hover:text-blue-500"
							>Return to home</a
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
