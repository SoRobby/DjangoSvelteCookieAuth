<script lang="ts">
    import * as Tabs from '$lib/components/ui/tabs';
    const { children } = $props();
</script>

<section class="pb-12">
    <Tabs.Root value="preview" class="w-full">
        {@render children()}
    </Tabs.Root>
</section>
