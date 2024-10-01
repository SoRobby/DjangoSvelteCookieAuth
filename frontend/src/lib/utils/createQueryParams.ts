export function createQueryParams(url: string, params: Record<string, string | number>): string {
    const queryString = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, value.toString()])
    ).toString();
    return `${url}?${queryString}`;
}
