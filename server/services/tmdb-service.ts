import TMDB from '@/types/tmdb-types';
import { TMDBApiURL, TMDBHeaders } from '@/config/tmdb-config';

import { api } from '../helpers/api-helper';
import { TMediaFilterSearchParams } from "@/types/types";

const TMDBService = {
	// https://developer.themoviedb.org/reference/trending-movies
	async getTrendingMovies() {
		const data = await api<TMDB.TRes<TMDB.TMovie[]>, { language: string }>(
			`${TMDBApiURL}/trending/movie/week`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/movie-top-rated-list
	async getTopRatedMovies() {
		const data = await api<
			TMDB.TRes<TMDB.TMovie[]>,
			{ language: string; region: string }
		>(`${TMDBApiURL}/movie/top_rated`, {
			params: {
				language: 'pl',
				region: 'PL',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/tv-series-top-rated-list
	async getTopRatedTV() {
		const data = await api<TMDB.TRes<TMDB.TTV[]>, { language: string }>(
			`${TMDBApiURL}/tv/top_rated`,
			{
				params: {
					language: 'pl',
				},
				headers: TMDBHeaders,
				options: {
					next: {
						revalidate: 3600,
					},
				},
			},
		);

		return data?.results.slice(0, 3);
	},
	// https://developer.themoviedb.org/reference/movie-details
	async getMovieDetails(id: number) {
		const data = await api<
			TMDB.TMovieDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBApiURL}/movie/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/movie-images
	async getMovieImages(id: number) {
		const data = await api<
			TMDB.TImages,
			null
		>(`${TMDBApiURL}/movie/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/tv-series-details
	async getTVDetails(id: number) {
		const data = await api<
			TMDB.TTVDetailsWithCredits,
			{ language: string; append_to_response: string }
		>(`${TMDBApiURL}/tv/${id}`, {
			params: {
				language: 'pl',
				append_to_response: 'credits',
			},
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/tv-series-images
	async getTVImages(id: number) {
		const data = await api<
			TMDB.TImages,
			null
		>(`${TMDBApiURL}/tv/${id}/images`, {
			headers: TMDBHeaders,
			options: {
				next: {
					revalidate: 3600 * 24 * 7,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/search-movie
	async searchMovie(query: string) {
		const data = await api<
			TMDB.TRes<TMDB.TMovie[]>,
			TMDB.TSearchMovieReq
		>(`${TMDBApiURL}/search/movie`, {
			headers: TMDBHeaders,
			params: {
				query,
				language: 'pl',
			},
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/search-tv
	async searchTV(query: string) {
		const data = await api<
			TMDB.TRes<TMDB.TTV[]>,
			TMDB.TSearchTVReq
		>(`${TMDBApiURL}/search/tv`, {
			headers: TMDBHeaders,
			params: {
				query,
				language: 'pl',
			},
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/discover-movie
	async discoverMovie(year?: number, genreId?: string, country?: string) {
		const data = await api<
			TMDB.TRes<TMDB.TMovie[]>,
			TMDB.TDiscoverMovieReq
		>(`${TMDBApiURL}/discover/movie`, {
			headers: TMDBHeaders,
			params: {
				language: 'pl',
				primary_release_year: year,
				with_genres: genreId,
				with_origin_country: country,
			},
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/discover-tv
	async discoverTV(year?: number, genreId?: string, country?: string) {
		const data = await api<
			TMDB.TRes<TMDB.TTV[]>,
			TMDB.TDiscoverTVReq
		>(`${TMDBApiURL}/discover/tv`, {
			headers: TMDBHeaders,
			params: {
				language: 'pl',
				first_air_date_year: year,
				with_genres: genreId,
				with_origin_country: country,
			},
			options: {
				next: {
					revalidate: 3600,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/genre-movie-list
	async getMovieGenres() {
		const data = await api<
			TMDB.TGenres,
			{language: string}
		>(`${TMDBApiURL}/genre/movie/list`, {
			headers: TMDBHeaders,
			params: {
				language: 'pl',
			},
			options: {
				next: {
					revalidate: 3600 * 24 * 30,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/genre-tv-list
	async getTVGenres() {
		const data = await api<
			TMDB.TGenres,
			{language: string}
		>(`${TMDBApiURL}/genre/tv/list`, {
			headers: TMDBHeaders,
			params: {
				language: 'pl',
			},
			options: {
				next: {
					revalidate: 3600 * 24 * 30,
				},
			},
		});

		return data;
	},
	// https://developer.themoviedb.org/reference/configuration-countries
	async getCountries() {
		const data = await api<
			TMDB.TCountry[],
			{language: string}
		>(`${TMDBApiURL}/configuration/countries`, {
			headers: TMDBHeaders,
			params: {
				language: 'pl',
			},
			options: {
				next: {
					revalidate: 3600 * 24 * 30,
				},
			},
		});

		return data;
	},
	async filterMedia(slug?: string, searchParams?: TMediaFilterSearchParams) {
		const type = searchParams?.type || 'movie';

		if(slug && type === 'movie') {
			return await this.searchMovie(slug);
		} else if(slug && type === 'tv') {
			return await this.searchTV(slug);
		}

		if(type === 'movie') {
			return await this.discoverMovie(
				searchParams?.year ? parseInt(searchParams.year) : undefined,
				searchParams?.genreId || '',
				searchParams?.country || '',
			);
		}

		return await this.discoverTV(
			searchParams?.year ? parseInt(searchParams.year) : undefined,
			searchParams?.genreId || '',
			searchParams?.country || '',
		);
	}
};

export default TMDBService;
