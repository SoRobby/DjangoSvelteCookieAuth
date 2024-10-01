<script lang="ts">
    const { children } = $props();
</script>

<div class="grid grid-cols-12 gap-6 py-6">
    {@render children()}
</div>