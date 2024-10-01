<script lang="ts">
    const {children} = $props();
</script>

<div class="text-muted-foreground text-sm py-2">
    {#if children}
        {@render children()}
    {/if}
</div>