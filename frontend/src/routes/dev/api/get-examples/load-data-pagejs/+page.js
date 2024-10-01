/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		post: {
			title: `Title for 'MyTitle' goes here`,
			content: `Content for 'MyContent' goes here`
		}
	};
}