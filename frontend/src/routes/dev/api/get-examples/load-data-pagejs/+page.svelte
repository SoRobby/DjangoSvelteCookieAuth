<script lang="ts">
	import { ComponentPageTitle } from '$lib/components/dev/component-page-title';
    import { ComponentBlock } from '$lib/components/dev/component-block';
    export let data;
</script>

<ComponentPageTitle title="GET Requests" />
<ComponentBlock>
	<ComponentBlock.Header>Load data from page.js</ComponentBlock.Header>
	<ComponentBlock.Description></ComponentBlock.Description>
	<ComponentBlock.Preview>
		<h1>{data.post.title}</h1>
		<div>{@html data.post.content}</div>
	</ComponentBlock.Preview>
	<ComponentBlock.Code></ComponentBlock.Code>
</ComponentBlock>
