/**
 * Formats an ISO date string to a readable format like "January DD, YYYY".
 *
 * @param isoDate - The ISO date string to be formatted (e.g., "2024-07-06T05:24:43.108Z").
 * @param locale - (Optional) The locale to use for formatting the date (default is "en-US").
 * @param options - (Optional) Additional formatting options for the date.
 * @returns A string representing the formatted date (e.g., "July 6, 2024").
 *          If an invalid date is passed, it returns 'Invalid Date'.
 */
export const formatDate = (
	isoDate: string,
	locale: string = 'en-US',
	options: Intl.DateTimeFormatOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}
): string => {
	const date = new Date(isoDate);
	return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString(locale, options);
};
