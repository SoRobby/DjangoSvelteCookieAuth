<script lang="ts">
    import type { Snippet } from 'svelte';
    let { children }: { children: Snippet } = $props();
    import { page } from '$app/stores';
</script>

<div>
    {@render children()}
</div>