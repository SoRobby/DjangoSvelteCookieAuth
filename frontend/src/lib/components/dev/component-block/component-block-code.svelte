<script lang="ts">
    import * as Tabs from '$lib/components/ui/tabs';

    export let code: string = '';
</script>

<Tabs.Content value="code">
    <div class="border border-muted rounded-md p-2 text-sm overflow-x-auto custom-scrollbar focus:ring-transparent">
        <pre class="language-html"><code class="focus:ring-none">{code}</code></pre>
    </div>
</Tabs.Content>


<style>
    /* Custom css styling for the overflow scrollbar */
    .custom-scrollbar::-webkit-scrollbar {
        width: 0.375rem !important;
        cursor: pointer;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        border-radius: 0.25rem !important;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
        background-color: rgba(229, 231, 235, var(--bg-opacity));
        cursor: pointer;
        background: #f1f5f9;
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
        cursor: pointer;
        background-color: #cbd5e1;
    }
</style>