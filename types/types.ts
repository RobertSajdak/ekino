export type THTTPMethod =
	| 'GET'
	| 'OPTIONS'
	| 'POST'
	| 'PUT'
	| 'PATCH'
	| 'DELETE';

export type TMediaTypes = 'movie' | 'tv';

export type TMediaFilterSearchParams = {
	year?: string;
	genreId?: string;
	country?: string;
	type?: TMediaTypes;
}
