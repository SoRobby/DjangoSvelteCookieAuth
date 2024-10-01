import { toast } from 'svelte-sonner';

export function copyLinkToClipboard(): void {
    if (navigator.clipboard && window.location.href) {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                toast.success('URL copied to clipboard');
            })
            .catch((error) => {
                console.error('Failed to copy URL: ', error);
            });
    } else {
        console.error('Clipboard API not supported');
    }
}