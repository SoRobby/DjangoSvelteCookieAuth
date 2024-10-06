/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	return {
		post: {
			title: `Title for xxx goes here`,
			content: `Content for xxx goes here`
		}
	};
}