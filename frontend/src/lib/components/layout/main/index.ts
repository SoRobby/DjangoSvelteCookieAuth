import { type VariantProps, tv } from 'tailwind-variants';
import Main from './main.svelte';

export const mainVariants = tv({
	base: 'px-4 mx-auto sm:px-6 md:px-0 py-4 sm:py-6',

	variants: {
		variant: {
			default: 'max-w-7xl',
			ultrawide: '',
			narrow: 'max-w-5xl'
		}
	},
	defaultVariants: {
		variant: 'default'
	}
});

export type Variant = VariantProps<typeof mainVariants>['variant'];

export { Main };
