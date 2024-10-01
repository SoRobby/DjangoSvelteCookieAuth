<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	let { data } = $props();
</script>

<ComponentPageTitle title="GET Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Server GET request (+page.server.js)</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<div class="bg-muted mt-4 rounded-md p-2 text-xs">
			<div class="font-medium uppercase">Data from server</div>
			<pre>{JSON.stringify(data, null, 4)}</pre>
		</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
