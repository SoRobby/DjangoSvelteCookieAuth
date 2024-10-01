<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
	import { ComponentBlock } from '$lib/components/dev/component-block';
	import { Button } from '$lib/components/ui/button';
</script>

<ComponentPageTitle title="POST Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Logout</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<form action="/logout" method="POST">
			<Button variant="outline" type="submit">Logout</Button>
		</form>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
