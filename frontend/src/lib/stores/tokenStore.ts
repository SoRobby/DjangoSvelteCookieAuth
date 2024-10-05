type TokenStoreSchema = {
	accessToken: string;
	refreshToken: string;
};

export const tokenStoreSchema: TokenStoreSchema = {
	accessToken: 'accessToken',
	refreshToken: 'refreshToken'
};

export default tokenStoreSchema;
