import ComponentBlock from './component-block.svelte';
import ComponentBlockHeader from './component-block-header.svelte';
import ComponentBlockDescription from './component-block-description.svelte';
import ComponentBlockPreview from './component-block-preview.svelte';
import ComponentBlockCode from './component-block-code.svelte';
import type {ExtendedComponentProps} from './index.d.ts'


// Create a type that combines the Svelte component with the extended properties
type ExtendedComponentBlock = typeof ComponentBlock & ExtendedComponentProps;

// Extend the Component with additional properties
const ExtendedComponentBlock: ExtendedComponentBlock = Object.assign(ComponentBlock, {
    Header: ComponentBlockHeader,
    Description: ComponentBlockDescription,
    Preview: ComponentBlockPreview,
    Code: ComponentBlockCode
})


export {
    ExtendedComponentBlock as ComponentBlock,
    ComponentBlockHeader,
    ComponentBlockDescription,
    ComponentBlockPreview,
    ComponentBlockCode,
}