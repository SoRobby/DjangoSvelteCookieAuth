<script lang="ts">
    import * as Tabs from '$lib/components/ui/tabs';
    const { children } = $props();
</script>

<Tabs.Content value="preview">
    {@render children()}
</Tabs.Content>