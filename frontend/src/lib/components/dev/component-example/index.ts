import Container from './container.svelte';
import InputBox from './input-box.svelte';
import OutputBox from './output-box.svelte';

export type { SvelteComponent } from 'svelte';

type ContainerComponent = typeof Container & {
	InputBox: typeof InputBox;
	OutputBox: typeof OutputBox;
};

const ExtendedContainer: ContainerComponent = Object.assign(Container, {
	InputBox,
	OutputBox
});

export { ExtendedContainer as Container };
