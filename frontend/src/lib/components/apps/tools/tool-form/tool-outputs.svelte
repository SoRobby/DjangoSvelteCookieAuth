<script lang="ts">
	import { Button } from '$lib/components/ui/button';
</script>

<div class="col-span-4 h-min overflow-hidden rounded-md border">
	<div class="flex justify-between bg-slate-100 px-4 py-3">
		<div>
			<h2 class="font-medium uppercase">Outputs</h2>
		</div>
		<div>
			<p class="text-sm">xxxx</p>
		</div>
	</div>
	<div class="grid gap-4 px-4 py-3">
		<div>
			<dl class="divide-y divide-gray-100 border-b border-gray-100">
				<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium">Power at Earth</dt>
					<dd class="text-sm text-gray-700 sm:col-span-2">190.54 W</dd>
				</div>
				<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium">Power at location</dt>
					<dd class="text-sm text-gray-700 sm:col-span-2">42.2 W</dd>
				</div>
				<div class="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
					<dt class="text-sm font-medium">Solar flux</dt>
					<dd class="text-sm text-gray-700 sm:col-span-2">38.2 W/m^2</dd>
				</div>
			</dl>
		</div>
		<div class="flex flex-row gap-3">
			<Button variant="outline">Share</Button>
			<Button variant="outline">Generate report</Button>
		</div>
	</div>
</div>
