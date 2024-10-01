import ComponentBlockHeader from './component-block-header.svelte';
import ComponentBlockDescription from './component-block-description.svelte';
import ComponentBlockPreview from './component-block-preview.svelte';
import ComponentBlockCode from './component-block-code.svelte';

export interface ExtendedComponentProps {
    Header: typeof ComponentBlockHeader;
    Description: typeof ComponentBlockDescription;
    Preview: typeof ComponentBlockPreview;
    Code: typeof ComponentBlockCode;
}