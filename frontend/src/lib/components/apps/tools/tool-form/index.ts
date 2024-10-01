// import ComponentBlock from './component-block.svelte';

import ToolForm from './tool-form.svelte';
import ToolInputs from './tool-inputs.svelte';
import ToolOutputs from './tool-outputs.svelte';
import type { ExtendedComponentProps } from './index.d.ts';

// Create a type that combines the Svelte component with the extended properties
type ExtendedComponent = typeof ToolForm & ExtendedComponentProps;

// Extend the Component with additional properties
const ExtendedComponentBlock: ExtendedComponent = Object.assign(ToolForm, {
    Inputs: ToolInputs,
    Outputs: ToolOutputs,
})

export {
    ExtendedComponentBlock as ToolForm,
    ToolInputs,
    ToolOutputs,
}
