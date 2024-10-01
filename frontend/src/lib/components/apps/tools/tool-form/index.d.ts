import ToolForm from './tool-form.svelte';
import ToolInputs from './tool-inputs.svelte';
import ToolOutputs from './tool-outputs.svelte';

export interface ExtendedComponentProps {
    Inputs: typeof ToolInputs;
    Outputs: typeof ToolOutputs;
}
