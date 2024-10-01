<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
</script>


<div class="col-span-8 h-min overflow-hidden rounded-md border">
	<div class="flex justify-between bg-slate-100 px-4 py-3">
		<div>
			<h2 class="font-medium uppercase">Inputs</h2>
		</div>
		<div>
			<p class="text-sm">xxxx</p>
		</div>
	</div>

	<div class="grid gap-4 px-4 py-3">
		<div>
			<div class="grid grid-cols-4 items-center">
				<div>
					<Label for="sun-distance">Sun distance</Label>
				</div>
				<div class="relative col-span-3 grid gap-1">
					<Input type="number" id="sun-distance" class="pr-10" />
					<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
						<span class="text-gray-500 sm:text-sm" id="price-currency">AU</span>
					</div>
				</div>
			</div>
			<div class="grid grid-cols-4">
				<div class="col-span-4 col-start-2">
					<p class="text-muted-foreground text-sm">Distance from the sun in astronomical units</p>
				</div>
			</div>
		</div>

		<div>
			<div class="grid grid-cols-4 items-center">
				<div>
					<Label for="incidence-angle">Incidence angle</Label>
				</div>
				<div class="col-span-3 grid gap-1">
					<Input type="number" id="incidence-angle" />
				</div>
			</div>
			<div class="grid grid-cols-4">
				<div class="col-span-3 col-start-2">
					<p class="text-muted-foreground text-sm">Angle relative to the solar panel</p>
				</div>
			</div>
		</div>

		<div>
			<div class="grid grid-cols-4 items-center">
				<div>
					<Label for="panel-effective-area">Effective panel area</Label>
				</div>
				<div class="col-span-3 grid gap-1">
					<Input type="number" id="panel-effective-area" />
				</div>
			</div>
			<div class="grid grid-cols-4">
				<div class="col-span-3 col-start-2">
					<p class="text-muted-foreground text-sm">Area of the panel that generates power</p>
				</div>
			</div>
		</div>

		<div>
			<div class="grid grid-cols-4 items-center">
				<div>
					<Label for="solar-cell-efficiency">Solar cell efficiency</Label>
				</div>
				<div class="col-span-3 grid gap-1">
					<Input type="number" id="solar-cell-efficiency" />
				</div>
			</div>
			<div class="grid grid-cols-4">
				<div class="col-span-3 col-start-2">
					<p class="text-muted-foreground text-sm">
						Solar panel power generation efficiency. Typical values range between 24% to 33%
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="flex justify-end px-4 py-3">
		<Button variant="outline">Calculate</Button>
	</div>
</div>
