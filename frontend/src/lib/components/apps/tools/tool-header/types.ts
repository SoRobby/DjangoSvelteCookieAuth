// types.ts
export type { SvelteComponent } from 'svelte';

export interface ContainerProps {
    children?: SvelteComponent | SvelteComponent[];
}

export interface InputBoxProps {
    children?: SvelteComponent | SvelteComponent[];
}

export interface OutputBoxProps {
    children?: SvelteComponent | SvelteComponent[];
}
